package com.yemajun.hao.browser;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.DownloadListener;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;
import android.view.WindowInsets;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import android.content.IntentFilter;
import android.webkit.CookieManager;
import android.webkit.URLUtil;
import android.os.Environment;
public class WebActivity extends AppCompatActivity implements View.OnClickListener {

    private WebView webView;
    private ProgressBar progressBar;
    private EditText textUrl;
    private ImageView webIcon, goBack, goForward, navSet, goHome, btnStart;
    private FrameLayout mLayout;
    private long exitTime = 0;
    private Context mContext;
    private InputMethodManager manager;

    private static final String HTTP = "http://";
    private static final String HTTPS = "https://";
    private static final int PRESS_BACK_EXIT_GAP = 2000;
    public static final String FILE = "file://";
    // ... 您的成员变量 (webView, mUrl, 等)
    private static final int WRITE_EXTERNAL_STORAGE_REQUEST_CODE = 101;
    private String pendingDownloadUrl;
    private String pendingUserAgent;
    private String pendingContentDisposition;
    private String pendingMimeType;
    private long pendingContentLength;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 请求窗口没有标题栏 (必须在 setContentView 之前调用)
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        // 设置全屏标志 (必须在 setContentView 之前调用)
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        // 对于具有刘海或摄像孔的设备，允许内容绘制到显示切口区域
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        }
        // 防止底部按钮上移
        getWindow().setSoftInputMode
                (WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN |
                        WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);

        setContentView(R.layout.activity_web);
        mLayout = (FrameLayout) findViewById(R.id.fl_video);

        mContext = WebActivity.this;
        manager = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);

        // 绑定控件
        initView();

        // 初始化 WebView
        initWeb();

        // 处理 作为三方浏览器打开传过来的值
        getDataFromBrowser(getIntent());
        // 为 WebView 设置下载监听器
        if (webView != null) {
            webView.setDownloadListener(new DownloadListener() {
                @Override
                public void onDownloadStart(String url, String userAgent,
                                            String contentDisposition, String mimeType,
                                            long contentLength) {
                    Log.d("DownloadDebug", "Download started for URL: " + url);
                    Log.d("DownloadDebug", "User-Agent: " + userAgent);
                    Log.d("DownloadDebug", "Content-Disposition: " + contentDisposition);
                    Log.d("DownloadDebug", "MIME type: " + mimeType);
                    Log.d("DownloadDebug", "Content-Length: " + contentLength);

                    // 存储下载信息，以备权限请求后使用
                    pendingDownloadUrl = url;
                    pendingUserAgent = userAgent;
                    pendingContentDisposition = contentDisposition;
                    pendingMimeType = mimeType;
                    pendingContentLength = contentLength;

                    // 检查写入权限 (对于 API 28 及以下, 或如果您想更灵活地控制下载位置)
                    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) { // Android 9 及以下
                        if (ContextCompat.checkSelfPermission(WebActivity.this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
                                != PackageManager.PERMISSION_GRANTED) {
                            // 请求权限
                            ActivityCompat.requestPermissions(WebActivity.this,
                                    new String[]{android.Manifest.permission.WRITE_EXTERNAL_STORAGE},
                                    WRITE_EXTERNAL_STORAGE_REQUEST_CODE);
                        } else {
                            // 权限已授予，开始下载
                            startDownload();
                        }
                    } else {
                        // Android 10 (API 29) 及以上，可以直接下载到公共目录或应用特定目录，通常不需要显式权限
                        startDownload();
                    }
                }
            });
        } else {
            Log.e("WebActivity", "WebView is null, cannot set DownloadListener.");
        }
        // 注册下载完成的广播接收器 (可选)
        getDataFromBrowser(getIntent());

    }

    private void startDownload() {
        if (pendingDownloadUrl == null) {
            Log.e("DownloadDebug", "Pending download URL is null. Cannot start download.");
            Toast.makeText(this, "下载链接无效", Toast.LENGTH_SHORT).show();
            return;
        }

        android.app.DownloadManager.Request request = new android.app.DownloadManager.Request(Uri.parse(pendingDownloadUrl));
        // 获取 Cookie (对于需要登录才能下载的链接很重要)
        String cookies = CookieManager.getInstance().getCookie(pendingDownloadUrl);
        request.addRequestHeader("cookie", cookies);
        request.addRequestHeader("User-Agent", pendingUserAgent);

        // 从 contentDisposition 中尝试解析文件名，如果无法解析则使用 URL 中的文件名
        String fileName = URLUtil.guessFileName(pendingDownloadUrl, pendingContentDisposition, pendingMimeType);
        Log.d("DownloadDebug", "Guessed FileName: " + fileName);


        request.setTitle(fileName); // 下载通知栏标题
        request.setDescription("正在下载..."); // 下载通知栏描述
        request.setMimeType(pendingMimeType);

        // 设置下载通知的可见性
        request.setNotificationVisibility(android.app.DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        // 设置下载路径
        // 对于 Android 10 (API 29) 及以上，推荐下载到公共的 Downloads 目录
        // 对于 Android 9 (API 28) 及以下，如果请求了 WRITE_EXTERNAL_STORAGE 权限，也可以这样做
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
        // 或者，下载到应用专属的外部存储目录 (不需要额外权限)
        // File destinationFile = new File(getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName);
        // request.setDestinationUri(Uri.fromFile(destinationFile));

        DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        if (downloadManager != null) {
            try {
                long downloadId = downloadManager.enqueue(request);
                Toast.makeText(this, "开始下载: " + fileName, Toast.LENGTH_LONG).show();
                Log.d("DownloadDebug", "Download enqueued with ID: " + downloadId);
            } catch (Exception e) {
                Toast.makeText(this, "下载启动失败: " + e.getMessage(), Toast.LENGTH_LONG).show();
                Log.e("DownloadDebug", "Error enqueuing download", e);
            }
        } else {
            Toast.makeText(this, "无法访问下载服务", Toast.LENGTH_SHORT).show();
            Log.e("DownloadDebug", "DownloadManager is null");
        }

        // 清除待处理的下载信息
        clearPendingDownload();
    }


    private void clearPendingDownload() {
        pendingDownloadUrl = null;
        pendingUserAgent = null;
        pendingContentDisposition = null;
        pendingMimeType = null;
        pendingContentLength = 0;
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == WRITE_EXTERNAL_STORAGE_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // 权限被授予
                Toast.makeText(this, "存储权限已获取，正在开始下载...", Toast.LENGTH_SHORT).show();
                startDownload();
            } else {
                // 权限被拒绝
                Toast.makeText(this, "存储权限被拒绝，无法下载文件。", Toast.LENGTH_LONG).show();
                clearPendingDownload();
            }
        }
    }

    // 监听下载完成的广播
    private BroadcastReceiver onDownloadComplete = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1); // Use android.app.DownloadManager here
            if (id != -1) {
                DownloadManager.Query query = new DownloadManager.Query(); // Use android.app.DownloadManager here
                query.setFilterById(id);
                DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE); // This is already correct
                android.database.Cursor cursor = dm.query(query);
                if (cursor != null && cursor.moveToFirst()) { // Add null check for cursor
                    int statusIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
                    int titleIndex = cursor.getColumnIndex(DownloadManager.COLUMN_TITLE);

                    if (DownloadManager.STATUS_SUCCESSFUL == cursor.getInt(statusIndex)) {
                        String fileName = cursor.getString(titleIndex);
                        Toast.makeText(WebActivity.this, "下载完成: " + fileName, Toast.LENGTH_LONG).show();
                        Log.d("DownloadDebug", "Download completed: " + fileName + " (ID: " + id + ")");
                    } else if (DownloadManager.STATUS_FAILED == cursor.getInt(statusIndex)){
                        int reasonIndex = cursor.getColumnIndex(DownloadManager.COLUMN_REASON);
                        int reason = cursor.getInt(reasonIndex);
                        String failedReason = "";
                        switch(reason){
                            case DownloadManager.ERROR_CANNOT_RESUME:
                                failedReason = "ERROR_CANNOT_RESUME";
                                break;
                            case DownloadManager.ERROR_DEVICE_NOT_FOUND:
                                failedReason = "ERROR_DEVICE_NOT_FOUND";
                                break;
                            // Add other DownloadManager error cases as needed
                        }
                        Log.e("DownloadDebug", "Download failed. Reason: " + failedReason + " (ID: " + id + ")");
                        Toast.makeText(WebActivity.this, "下载失败: " + failedReason, Toast.LENGTH_LONG).show();
                    }
                    cursor.close(); // Don't forget to close the cursor
                }
            }
        }
    };


    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 取消注册广播接收器
        unregisterReceiver(onDownloadComplete);
        clearPendingDownload(); // 清理，以防 Activity 销毁时有待处理的下载
    }

    /**
     * 使用singleTask启动模式的Activity在系统中只会存在一个实例。
     * 如果这个实例已经存在，intent就会通过onNewIntent传递到这个Activity。
     * 否则新的Activity实例被创建。
     */
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        getDataFromBrowser(intent);
    }

    /**
     * 作为三方浏览器打开传过来的值
     * Scheme: https
     * url = scheme + "://" + host + path;
     */
    private void getDataFromBrowser(Intent intent) {
        Uri data = intent.getData();
        if (data != null) {
            try {
                String scheme = data.getScheme();
                String host = data.getHost();
                String path = data.getPath();
                String text = "Scheme: " + scheme + "\n" + "host: " + host + "\n" + "path: " + path;
                Log.e("data", text);
                String url = scheme + "://" + host + path;
                webView.loadUrl(url);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * 绑定控件
     */
    private void initView() {
        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);
        textUrl = findViewById(R.id.textUrl);
        webIcon = findViewById(R.id.webIcon);
        btnStart = findViewById(R.id.btnStart);
        goBack = findViewById(R.id.goBack);
        goForward = findViewById(R.id.goForward);
        navSet = findViewById(R.id.navSet);
        goHome = findViewById(R.id.goHome);

        // 绑定按钮点击事件
        btnStart.setOnClickListener(this);
        goBack.setOnClickListener(this);
        goForward.setOnClickListener(this);
        navSet.setOnClickListener(this);
        goHome.setOnClickListener(this);

        // 地址输入栏获取与失去焦点处理
        textUrl.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View view, boolean hasFocus) {
                if (hasFocus) {
                    // 显示当前网址链接 TODO:搜索页面显示搜索词
                    textUrl.setText(webView.getUrl());
                    // 光标置于末尾
                    textUrl.setSelection(0,textUrl.getText().length());
                    // 显示因特网图标
                    webIcon.setImageResource(R.drawable.internet);
                    // 显示跳转按钮
                    btnStart.setImageResource(R.drawable.go);
                } else {
                    // 显示网站名
                    textUrl.setText(webView.getTitle());
                    // 显示网站图标
                    webIcon.setImageBitmap(webView.getFavicon());
                    // 显示刷新按钮
                    btnStart.setImageResource(R.drawable.refresh);
                }
            }
        });

        // 监听键盘回车搜索
        textUrl.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View view, int keyCode, KeyEvent keyEvent) {
                if (keyCode == KeyEvent.KEYCODE_ENTER && keyEvent.getAction() == KeyEvent.ACTION_DOWN) {
                    // 执行搜索
                    btnStart.callOnClick();
                    textUrl.clearFocus();
                }
                return false;
            }
        });
    }

    private static String converKeywordLoadOrSearch(String keyword) {
        keyword = keyword.trim();

        if (keyword.startsWith("www.")) {
            keyword = HTTP + keyword;
        } else if (keyword.startsWith("ftp.")) {
            keyword = "ftp://" + keyword;
        }

        boolean containsPeriod = keyword.contains(".");
        boolean isIPAddress = (TextUtils.isDigitsOnly(keyword.replace(".", ""))
                && (keyword.replace(".", "").length() >= 4) && keyword.contains("."));
        boolean aboutScheme = keyword.contains("about:");
        boolean validURL = (keyword.startsWith("ftp://") || keyword.startsWith(HTTP)
                || keyword.startsWith(FILE) || keyword.startsWith(HTTPS))
                || isIPAddress;
        boolean isSearch = ((keyword.contains(" ") || !containsPeriod) && !aboutScheme);

        if (isIPAddress
                && (!keyword.startsWith(HTTP) || !keyword.startsWith(HTTPS))) {
            keyword = HTTP + keyword;
        }

        String converUrl;
        if (isSearch) {
            try {
                keyword = URLEncoder.encode(keyword, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if (keyword == "") {
             converUrl = "https://hao.yemajun.com";
            } else {
            converUrl = "http://www.baidu.com/s?wd=" + keyword + "&ie=UTF-8";
            }
        } else if (!validURL) {
            converUrl = HTTP + keyword;
        } else {
            converUrl = keyword;
        }
        return converUrl;
    }

    /**
     * 初始化 web
     */
    @SuppressLint("SetJavaScriptEnabled")
    private void initWeb() {
        // 重写 WebViewClient
       // webView.setWebViewClient(new MkWebViewClient());
        //解决重定向返回问题
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);
                //网络异常，WebView加载我们自定义的页面
                webView.loadUrl("https://hao.yemajun.com");;
                Toast.makeText(mContext, "页面打不开，已返回主页",
                        Toast.LENGTH_SHORT).show();
                exitTime = System.currentTimeMillis();

            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // 设置在webView点击打开的新网页在当前界面显示,而不跳转到新的浏览器中

                if (url == null) {
                    // 返回true自己处理，返回false不处理
                    return false;
                }

                // 正常的内容，打开
                if (url.startsWith(HTTP) || url.startsWith(HTTPS)) {


                    return false;
                }

                // 调用第三方应用，防止crash (如果手机上没有安装处理某个scheme开头的url的APP, 会导致crash)
                try {
                    // TODO:弹窗提示用户，允许后再调用
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                    return true;
                } catch (Exception e) {
                    return true;
                }
            }


        });

        // 重写 WebChromeClient
        webView.setWebChromeClient(new MkWebChromeClient());

        WebSettings settings = webView.getSettings();
        // 启用 js 功能
        settings.setJavaScriptEnabled(true);
        // 设置浏览器 UserAgent
        settings.setUserAgentString(settings.getUserAgentString() + " YemaBrowser/" + getVerName(mContext));

        // 将图片调整到适合 WebView 的大小
        settings.setUseWideViewPort(true);
        // 缩放至屏幕的大小
        settings.setLoadWithOverviewMode(true);

        // 支持缩放，默认为true。是下面那个的前提。
        settings.setSupportZoom(true);
        // 设置内置的缩放控件。若为false，则该 WebView 不可缩放
        settings.setBuiltInZoomControls(true);
        // 隐藏原生的缩放控件
        settings.setDisplayZoomControls(false);

        // 缓存
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        // 设置可以访问文件
        settings.setAllowFileAccess(true);
        // 支持通过JS打开新窗口
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        // 支持自动加载图片
        settings.setLoadsImagesAutomatically(true);

        // 设置默认编码格式
        settings.setDefaultTextEncodingName("utf-8");
        // 本地存储
        // 加快HTML网页加载完成速度
        if (Build.VERSION.SDK_INT >= 19) {
            settings.setLoadsImagesAutomatically(true);
        } else {
            settings.setLoadsImagesAutomatically(false);
        }

        // 开启Application H5 Caches 功能
        settings.setDomStorageEnabled(true);   // 启用 DOM Storage
        settings.setDatabaseEnabled(true);     // 启用 Web SQL/IndexedDB 数据库
        settings.setCacheMode(WebSettings.LOAD_DEFAULT); // 默认缓存模式
        settings.setDomStorageEnabled(true);
        settings.setPluginState(WebSettings.PluginState.ON);

        // 资源混合模式
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        // 加载首页
        webView.loadUrl(getResources().getString(R.string.home_url));
    }


    /**
     * 重写 WebViewClient
     */
    private class MkWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            // 设置在webView点击打开的新网页在当前界面显示,而不跳转到新的浏览器中

            if (url == null) {
                // 返回true自己处理，返回false不处理
                return true;
            }

            // 正常的内容，打开
            if (url.startsWith(HTTP) || url.startsWith(HTTPS)) {

                view.loadUrl(url);
                return true;
            }

            // 调用第三方应用，防止crash (如果手机上没有安装处理某个scheme开头的url的APP, 会导致crash)
            try {
                // TODO:弹窗提示用户，允许后再调用
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
                return true;
            } catch (Exception e) {
                return true;
            }
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            // 网页开始加载，显示进度条
            progressBar.setProgress(0);
            progressBar.setVisibility(View.VISIBLE);

            // 更新状态文字
            textUrl.setText("(゜-゜)つ加载中...");

            // 切换默认网页图标
            webIcon.setImageResource(R.drawable.internet);
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            // 网页加载完毕，隐藏进度条
            progressBar.setVisibility(View.INVISIBLE);

            // 改变标题
            setTitle(webView.getTitle());
            // 显示页面标题
            textUrl.setText(webView.getTitle());
            if(!webView.getSettings().getLoadsImagesAutomatically()) {
                webView.getSettings().setLoadsImagesAutomatically(true);
            }
        }
    }




    /**
     * 重写 WebChromeClient
     */
    private class MkWebChromeClient extends WebChromeClient {
        private final static int WEB_PROGRESS_MAX = 100;
        private CustomViewCallback mCustomViewCallback;
        //  横屏时，显示视频的view
        private View mCustomView;

        // 点击全屏按钮时，调用的方法
        @Override
        public void onShowCustomView(View view, CustomViewCallback callback) {
            super.onShowCustomView(view, callback);

            //如果view 已经存在，则隐藏
            if (mCustomView != null) {
                callback.onCustomViewHidden();
                return;
            }

            mCustomView = view;
            mCustomView.setVisibility(View.VISIBLE);
            mCustomViewCallback = callback;
            mLayout.addView(mCustomView);
            mLayout.setVisibility(View.VISIBLE);
            mLayout.bringToFront();
            findViewById(R.id.agoHome).setVisibility(View.GONE);;
            //设置横屏
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        }

        // 取消全屏调用的方法
        @Override
        public void onHideCustomView() {
            super.onHideCustomView();
            if (mCustomView == null) {
                return;
            }
            mCustomView.setVisibility(View.GONE);
            mLayout.removeView(mCustomView);
            mCustomView = null;
            mLayout.setVisibility(View.GONE);
            findViewById(R.id.agoHome).setVisibility(View.VISIBLE);;
            try {
                mCustomViewCallback.onCustomViewHidden();
            } catch (Exception e) {
            }

            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);//竖屏
        }
        /**
         * 横竖屏切换监听
         */


        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            super.onProgressChanged(view, newProgress);

            // 加载进度变动，刷新进度条
            progressBar.setProgress(newProgress);
            if (newProgress > 0) {
                if (newProgress == WEB_PROGRESS_MAX) {
                    progressBar.setVisibility(View.INVISIBLE);
                } else {
                    progressBar.setVisibility(View.VISIBLE);
                }
            }
        }

        @Override
        public void onReceivedIcon(WebView view, Bitmap icon) {
            super.onReceivedIcon(view, icon);

            // 改变图标
            webIcon.setImageBitmap(icon);
        }

        @Override
        public void onReceivedTitle(WebView view, String title) {
            super.onReceivedTitle(view, title);

            // 改变标题
            setTitle(title);
            // 显示页面标题
            textUrl.setText(title);
        }
    }
    /**
     * 下载
     */

    /**
     * 返回按钮处理
     */
    @Override
    public void onBackPressed() {
        // 能够返回则返回上一页
        if (webView.canGoBack()) {
            textUrl.clearFocus();
            webView.goBack();
        } else {
            if ((System.currentTimeMillis() - exitTime) > PRESS_BACK_EXIT_GAP) {
                // 连点两次退出程序
                Toast.makeText(mContext, "再按一次退出程序",
                        Toast.LENGTH_SHORT).show();
                exitTime = System.currentTimeMillis();
            } else {
                super.onBackPressed();
            }

        }
    }

    @Override
    public void onClick(View v) {
        int id = v.getId();

        if (id == R.id.btnStart) {
            // 跳转 或 刷新
            if (textUrl.hasFocus()) {
                // 隐藏软键盘
                if (manager.isActive()) {
                    manager.hideSoftInputFromWindow(textUrl.getApplicationWindowToken(), 0);
                }

                // 地址栏有焦点，是跳转
                String input = converKeywordLoadOrSearch(textUrl.getText().toString());

                webView.loadUrl(input);

                // 取消掉地址栏的焦点
                textUrl.clearFocus();
            } else {
                // 地址栏没焦点，是刷新
                webView.reload();
                textUrl.clearFocus();
            }

        } else if (id == R.id.goBack) {
            // 后退
            webView.goBack();

        } else if (id == R.id.goForward) {
            // 前进
            webView.goForward();

        } else if (id == R.id.navSet) {
            // 设置
            Toast.makeText(mContext, "功能开发中", Toast.LENGTH_SHORT).show();

        } else if (id == R.id.goHome) {
            // 主页
            textUrl.clearFocus();
            webView.loadUrl(getResources().getString(R.string.home_url));
        }
    }





    @Override
    protected void onPause() {
        super.onPause();
        try {
            webView.getClass().getMethod("onPause").invoke(webView);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        try {
            webView.getClass().getMethod("onResume").invoke(webView);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 判断字符串是否为URL（https://blog.csdn.net/bronna/article/details/77529145）
     *
     * @param urls 要勘定的字符串
     * @return true:是URL、false:不是URL
     */
    public static boolean isHttpUrl(String urls) {
        boolean isUrl;
        // 判断是否是网址的正则表达式
        String regex = "(((https|http)?://)?([a-z0-9]+[.])|(www.))"
                + "\\w+[.|\\/]([a-z0-9]{0,})?[[.]([a-z0-9]{0,})]+((/[\\S&&[^,;\u4E00-\u9FA5]]+)+)?([.][a-z0-9]{0,}+|/?)";

        Pattern pat = Pattern.compile(regex.trim());
        Matcher mat = pat.matcher(urls.trim());
        isUrl = mat.matches();
        return isUrl;
    }

    /**
     * 获取版本号名称
     *
     * @param context 上下文
     * @return 当前版本名称
     */
    private static String getVerName(Context context) {
        String verName = "unKnow";
        try {
            verName = context.getPackageManager().
                    getPackageInfo(context.getPackageName(), 0).versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return verName;
    }
}
