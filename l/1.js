! function(e) {
    var n = !1;
    if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) {
        var o = window.Cookies,
            t = window.Cookies = e();
        t.noConflict = function() {
            return window.Cookies = o, t
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var t in o) n[t] = o[t]
        }
        return n
    }

    function n(o) {
        function t(n, r, i) {
            var c;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof(i = e({
                            path: "/"
                        }, t.defaults, i)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a
                    }
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                    try {
                        c = JSON.stringify(r), /^[\{\[]/.test(c) && (r = c)
                    } catch (e) {}
                    r = o.write ? o.write(r, n) : encodeURIComponent(r + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), n = (n = (n = encodeURIComponent(n + "")).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var s = "";
                    for (var f in i) i[f] && (s += "; " + f, !0 !== i[f] && (s += "=" + i[f]));
                    return document.cookie = n + "=" + r + s
                }
                n || (c = {});
                for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, u = 0; u < p.length; u++) {
                    var l = p[u].split("="),
                        C = l.slice(1).join("=");
                    this.json || '"' !== C.charAt(0) || (C = C.slice(1, -1));
                    try {
                        var m = l[0].replace(d, decodeURIComponent);
                        if (C = o.read ? o.read(C, m) : o(C, m) || C.replace(d, decodeURIComponent), this.json) try {
                            C = JSON.parse(C)
                        } catch (e) {}
                        if (n === m) {
                            c = C;
                            break
                        }
                        n || (c[m] = C)
                    } catch (e) {}
                }
                return c
            }
        }
        return t.set = t, t.get = function(e) {
            return t.call(t, e)
        }, t.getJSON = function() {
            return t.apply({
                json: !0
            }, [].slice.call(arguments))
        }, t.defaults = {}, t.remove = function(n, o) {
            t(n, "", e(o, {
                expires: -1
            }))
        }, t.withConverter = n, t
    }
    return n(function() {})
});
var comm_list = [{
    slug: "common",
    list: [{
        tag: "热门",
        link: [{
            name: "百度热搜",
            url: "http://top.baidu.com/"
        }, {
            name: "微博热门",
            url: "https://s.weibo.com/top/summary?cate=realtimehot"
        }, {
            name: "知乎热榜",
            url: "https://www.zhihu.com/billboard"
        }, {
            name: "应用排行",
            url: "https://app.diandian.com/"
        }, {
            name: "电视剧榜单",
            url: "https://movie.douban.com/tv/"
        }, {
            name: "电影榜单",
            url: "https://movie.douban.com/"
        }, {
            name: "音乐热歌",
            url: "https://www.kugou.com/yy/rank/home"
        }]
    }, {
        tag: "新鲜",
        link: [{
            name: "今日热榜",
            url: "https://tophub.today/"
        }, {
            name: "虎扑",
            url: "https://bbs.hupu.com/all-gambia"
        }, {
            name: "淘江湖",
            url: "https://jianghu.taobao.com/"
        }, {
            name: "Box123",
            url: "https://box123.io/"
        }, {
            name: "知微事见",
            url: "http://ef.zhiweidata.com/"
        }, {
            name: "NGA",
            url: "https://bbs.nga.cn/"
        }, {
            name: "抽屉",
            url: "https://dig.chouti.cn"
        }]
    }, {
        tag: "有趣",
        link: [{
            name: "NodeSeek",
            url: "https://www.nodeseek.com/"
        }, {
            name: "A姐分享",
            url: "https://www.ahhhhfs.com/"
        }, {
            name: "恩山无线",
            url: "https://www.right.com.cn/forum/"
        }, {
            name: "吾爱破解",
            url: "https://www.52pojie.cn/forum.php"
        }, {
            name: "小霸王",
            url: "https://www.yikm.net/"
        }, {
            name: "饭否",
            url: "https://fanfou.com/"
        }, {
            name: "煎蛋",
            url: "https://jandan.net/top"
        }]
    }, {
        tag: "科技",
        link: [{
            name: "IT之家",
            url: "https://www.ithome.com"
        }, {
            name: "Readhub",
            url: "https://readhub.cn"
        }, {
            name: "少数派",
            url: "https://sspai.com/"
        }, {
            name: "51cto",
            url: "https://www.51cto.com/"
        }, {
            name: "InfoQ",
            url: "https://www.infoq.cn/"
        }, {
            name: "站长之家",
            url: "http://www.chinaz.com/"
        }, {
            name: "湾区日报",
            url: "https://wanqu.co/"
        }]
    }, {
        tag: "技术",
        link: [{
            name: "掘金",
            url: "https://juejin.im/"
        }, {
            name: "博客园",
            url: "https://www.cnblogs.com/"
        }, {
            name: "开源中国",
            url: "https://www.oschina.net"
        }, {
            name: "ITpub",
            url: "http://www.itpub.net/"
        }, {
            name: "V2EX",
            url: "https://www.v2ex.com/"
        }, {
            name: "Freebuf",
            url: "http://www.freebuf.com"
        }, {
            name: "思否",
            url: "https://segmentfault.com/"
        }]
    }, {
        tag: "创投",
        link: [{
            name: "野马创社",
            url: "https://yemacs.com"
        }, {            
            name: "36氪",
            url: "https://36kr.com/"
        }, {
            name: "创业邦",
            url: "http://www.cyzone.cn/"
        }, {
            name: "投资界",
            url: "https://www.pedaily.cn/"
        }, {
            name: "砍柴",
            url: "http://www.ikanchai.com/"
        }, {
            name: "i黑马",
            url: "http://www.iheima.com/"
        }, {
            name: "创头条",
            url: "http://www.ctoutiao.com/"
        }]
    }, {
        tag: "财经",
        link: [{
            name: "淘股吧",
            url: "https://m.taoguba.com.cn/"
        }, {
            name: "东方财富",
            url: "https://data.eastmoney.com/"
        }, {
            name: "新浪财经",
            url: "https://gu.sina.cn/"
        }, {
            name: "财联社",
            url: "https://m.cls.cn/"
        }, {
            name: "天津股侠",
            url: "https://weibo.com/u/1896820725"
        }, {
            name: "叶荣添",
            url: "https://weibo.com/u/1364334665"
        }, {
            name: "李大霄",
            url: "https://weibo.com/u/1645823934"
        }]
    }, {
        tag: "资讯",
        link: [{
            name: "网易",
            url: "https://www.163.com/"
        }, {
            name: "腾讯",
            url: "https://www.qq.com/"
        }, {
            name: "新浪",
            url: "http://www.sina.com.cn/"
        }, {
            name: "搜狐",
            url: "http://www.sohu.com/"
        }, {
            name: "凤凰网",
            url: "http://www.ifeng.com/"
        }, {
            name: "人民网",
            url: "http://www.people.com.cn/"
        }, {
            name: "新华网",
            url: "http://xinhuanet.com/"
        }]
    }, {
        tag: "电影",
        link: [{
            name: "电影先生",
            url: "https://dianyi.ng/"
        }, {
            name: "可可影视",
            url: "https://www.keke2.app/"
        }, {
            name: "低端影视",
            url: "https://ddys.pro/"
        }, {
            name: "茶杯虎",
            url: "https://www.725998.com/"
        }, {
            name: "伪人人影视",
            url: "https://www.renren.pro/"
        }, {
            name: "不太灵",
            url: "https://www.2bt0.com/"
        }, {
            name: "人人电影网",
            url: "https://www.rrdynb.com/"
        }]
    }, {
        tag: "直播",
        link: [{
            name: "斗鱼",
            url: "https://www.douyu.com/"
        }, {
            name: "虎牙",
            url: "http://www.huya.com/"
        }, {
            name: "YY",
            url: "https://www.yy.com/"
        }, {
            name: "战旗",
            url: "https://www.zhanqi.tv/"
        }, {
            name: "龙珠",
            url: "http://www.longzhu.com/"
        }, {
            name: "电视眼",
            url: "http://www.tvyan.com/"
        }, {
            name: "Twitch",
            url: "https://www.twitch.tv"
        }]
    }, {
        tag: "视频",
        link: [{
            name: "优酷",
            url: "https://www.youku.com/"
        }, {
            name: "爱奇艺",
            url: "https://www.iqiyi.com/"
        }, {
            name: "腾讯视频",
            url: "https://v.qq.com/"
        }, {
            name: "哔哩哔哩",
            url: "https://www.bilibili.com/"
        }, {
            name: "搜狐视频",
            url: "https://tv.sohu.com/"
        }, {
            name: "AcFun",
            url: "http://www.acfun.cn/"
        }, {
            name: "梨视频",
            url: "https://www.pearvideo.com/"
        }]
    }, {
        tag: "音频",
        link: [{
            name: "企鹅FM",
            url: "https://fm.qq.com/"
        }, {
            name: "蜻蜓FM",
            url: "https://www.qingting.fm/"
        }, {
            name: "凤凰FM",
            url: "http://diantai.ifeng.com/"
        }, {
            name: "喜马拉雅",
            url: "https://www.ximalaya.com/"
        }, {
            name: "百度乐播",
            url: "http://lebo.taihe.com/"
        }, {
            name: "QQ音乐",
            url: "https://y.qq.com/"
        }, {
            name: "网易音乐",
            url: "https://music.163.com/"
        }]
    }, {
        tag: "阅读",
        link: [{
            name: "百度阅读",
            url: "https://yuedu.baidu.com/"
        }, {
            name: "网易阅读",
            url: "https://yuedu.163.com/"
        }, {
            name: "多看",
            url: "http://www.duokan.com/"
        }, {
            name: "豆瓣读书",
            url: "https://book.douban.com/"
        }, {
            name: "当当云阅读",
            url: "http://e.dangdang.com/"
        }, {
            name: "掌阅",
            url: "http://www.ireader.com/"
        }, {
            name: "微信读书",
            url: "https://weread.qq.com/"
        }]
    }, {
        tag: "商店",
        link: [{
            name: "淘宝",
            url: "https://www.taobao.com/"
        }, {
            name: "天猫",
            url: "https://www.tmall.com/"
        }, {
            name: "京东",
            url: "https://www.jd.com/"
        }, {
            name: "亚马逊",
            url: "https://www.amazon.cn/"
        }, {
            name: "一号店",
            url: "http://www.yhd.com/"
        }, {
            name: "网易考拉",
            url: "https://www.kaola.com"
        }, {
            name: "当当网",
            url: "http://www.dangdang.com/"
        }]
    }, {
        tag: "学习",
        link: [{
            name: "网易公开课",
            url: "https://open.163.com/"
        }, {
            name: "腾讯课堂",
            url: "https://ke.qq.com/"
        }, {
            name: "百度传课",
            url: "https://chuanke.baidu.com/"
        }, {
            name: "慕课网",
            url: "https://www.imooc.com/"
        }, {
            name: "麦子学院",
            url: "http://www.maiziedu.com/"
        }, {
            name: "学堂在线",
            url: "http://www.xuetangx.com/"
        }, {
            name: "多贝",
            url: "http://www.duobei.com/"
        }]
    }, {
        tag: "招聘",
        link: [{
            name: "拉勾",
            url: "https://www.lagou.com"
        }, {
            name: "直聘",
            url: "https://www.zhipin.com/"
        }, {
            name: "刺猬实习",
            url: "https://www.ciweishixi.com/"
        }, {
            name: "智联招聘",
            url: "https://www.zhaopin.com/"
        }, {
            name: "前程无忧",
            url: "https://www.51job.com/"
        }, {
            name: "58",
            url: "https://www.58.com/job/"
        }, {
            name: "赶集",
            url: "http://www.ganji.com/zhaopin/"
        }]
    }, {
        tag: "小程序",
        link: [{
            name: "野马程序",
            url: "https://xcx.yemajun.com"
        }, {
            name: "知晓程序",
            url: "https://minapp.com/miniapp/"
        }, {
            name: "大梦想",
            url: "https://www.damengxiang.me/"
        }, {
            name: "阿拉丁",
            url: "https://www.aldzs.com/"
        }, {
            name: "追格",
            url: "http://xcx.zhuige.com/"
        }, {
            name: "IM小程序",
            url: "http://www.imxiaochengxu.com/"
        }, {
            name: "InmApp",
            url: "http://www.inmapp.cn/"
        }]
    }, {
        tag: "创业库",
        link: [{
            name: "IT桔子",
            url: "https://itjuzi.com/"
        }, {
            name: "36氪",
            url: "https://rong.jingdata.com/"
        }, {
            name: "项目工场",
            url: "http://www.pemarket.com.cn/"
        }, {
            name: "创业邦",
            url: "http://www.cyzone.cn/event/"
        }, {
            name: "投资界",
            url: "https://zdb.pedaily.cn/enterprise/"
        }, {
            name: "新芽",
            url: "https://www.newseed.cn/project"
        }, {
            name: "I黑马",
            url: "http://www.iheima.com/enterprise-library/index"
        }]
    }, {
        tag: "查公司",
        link: [{
            name: "国家企业信息",
            url: "http://www.gsxt.gov.cn/index.html"
        }, {
            name: "天眼查",
            url: "https://www.tianyancha.com"
        }, {
            name: "企查查",
            url: "https://www.qichacha.com/"
        }, {
            name: "企信宝",
            url: "https://www.qixin.com/"
        }, {
            name: "企查猫",
            url: "https://www.qichamao.com/"
        }, {
            name: "搜企",
            url: "http://www.soqi.com/"
        }, {
            name: "水滴信用",
            url: "https://shuidi.cn/"
        }]
    }, {
        tag: "云服务",
        link: [{
            name: "腾讯云",
            url: "https://cloud.tencent.com/"
        }, {
            name: "阿里云",
            url: "https://www.aliyun.com"
        }, {
            name: "京东云",
            url: "https://www.jdcloud.com"
        }, {
            name: "百度云",
            url: "https://cloud.baidu.com/"
        }, {
            name: "GCP",
            url: "https://cloud.google.com"
        }, {
            name: "AWS",
            url: "https://aws.amazon.com"
        }, {
            name: "Vultr",
            url: "https://www.vultr.com/"
        }]
    }, {
        tag: "前端库",
        link: [{
            name: "jsDelivr ",
            url: "https://www.jsdelivr.com/"
        }, {
            name: "sinaapp",
            url: "http://lib.sinaapp.com/"
        }, {
            name: "阳光公共库",
            url: "http://libs.sun0769.com/"
        }, {
            name: "loli",
            url: "https://css.loli.net/"
        }, {
            name: "360公共库",
            url: "https://cdn.baomitu.com/"
        }, {
            name: "Upai",
            url: "http://jscdn.upai.com/"
        }, {
            name: "Staticfile",
            url: "http://www.staticfile.org/"
        }]
    }, {
        tag: "免费CDN",
        link: [{
            name: "百度云加速",
            url: "https://su.baidu.com/"
        }, {
            name: "360CDN",
            url: "https://wangzhan.qianxin.com/"
        }, {
            name: "Cloudflare",
            url: "https://www.cloudflare.com/zh-cn/"
        }, {
            name: "腾讯CDN",
            url: "https://cloud.tencent.com/product/cdn"
        }, {
            name: "七牛",
            url: "https://www.qiniu.com/prices?source=fusion"
        }, {
            name: "BootCDN",
            url: "https://www.bootcdn.cn/"
        }, {
            name: "cdnjs",
            url: "https://cdnjs.net/"
        }]
    }, {
        tag: "免费主机",
        link: [{
            name: "Oracle",
            url: "https://www.oracle.com/cn/cloud/free/"
        }, {
            name: "Openshift",
            url: "https://www.openshift.com/trial/"
        }, {
            name: "主机屋",
            url: "http://www.zhujiwu.com/"
        }, {
            name: "Hostinger",
            url: "https://www.hostinger.com.hk/free-hosting"
        }, {
            name: "Gearhost",
            url: "https://www.gearhost.com/"
        }, {
            name: "浦东信息港",
            url: "http://www.pdxx.net/"
        }, {
            name: "强人",
            url: "https://www.qiangren.net/html/active/vhost-free/"
        }]
    }, {
        tag: "国外短信",
        link: [{
            name: "miracletele",
            url: "https://miracletele.com/sms/"
        }, {
            name: "freesms",
            url: "http://receivefreesms.net/"
        }, {
            name: "smsonline",
            url: "https://www.receivesmsonline.net/"
        }, {
            name: "receivefreesms",
            url: "http://receivefreesms.com/"
        }, {
            name: "receive-sms",
            url: "https://www.receive-sms-online.info/"
        }, {
            name: "smsreceivefree",
            url: "https://smsreceivefree.com/"
        }, {
            name: "短信发送",
            url: "http://www.afreesms.com/intl/china"
        }]
    }, {
        tag: "临时短信",
        link: [{
            name: "云短信",
            url: "https://www.pdflibr.com/"
        }, {
            name: "小鸟接码",
            url: "http://www.xnsms.com/"
        }, {
            name: "ZUSMS",
            url: "https://zusms.com/"
        }, {
            name: "隐私小号",
            url: "https://www.yinsixiaohao.com/"
        }, {
            name: "z-sms",
            url: "http://www.z-sms.com/"
        }, {
            name: "SMSonline",
            url: "https://sms-online.co/"
        }, {
            name: "Freeonline",
            url: "https://www.freeonlinephone.org/"
        }]
    }, {
        tag: "临时邮箱",
        link: [{
            name: "BccTo",
            url: "https://bccto.me/"
        }, {
            name: "临时邮",
            url: "https://www.linshiyouxiang.net/"
        }, {
            name: "TEMPMAIL",
            url: "https://temp-mail.org/zh/"
        }, {
            name: "10分钟邮箱",
            url: "https://10minutemail.net/"
        }, {
            name: "10minute",
            url: "https://10minutemail.com/10MinuteMail/index.html"
        }, {
            name: "Moakt",
            url: "https://www.moakt.com/"
        }, {
            name: "Chacuo",
            url: "http://24mail.chacuo.net/"
        }]
    }, {
        tag: "临时网盘",
        link: [{
            name: "奶牛快传",
            url: "https://cowtransfer.com/"
        }, {
            name: "Firefox Send",
            url: "https://send.firefox.com/"
        }, {
            name: "WeTrTansfer",
            url: "https://wetransfer.com/"
        }, {
            name: "空投",
            url: "https://airportal.cn/"
        }, {
            name: "FileIO",
            url: "https://www.file.io/"
        }, {
            name: "云U盘",
            url: "https://box.zjuqsc.com/"
        }, {
            name: "Catbox",
            url: "https://catbox.moe/"
        }]
    }, {
        tag: "安卓商店",
        link: [{
            name: "应用宝",
            url: "https://sj.qq.com/myapp/"
        }, {
            name: "酷安",
            url: "https://www.coolapk.com/apk/"
        }, {
            name: "百度助手",
            url: "https://shouji.baidu.com/"
        }, {
            name: "APKpure",
            url: "https://apkpure.com/cn/"
        }, {
            name: "Aptoide",
            url: "https://cn.aptoide.com/"
        }, {
            name: "APK-dl",
            url: "https://apk-dl.com/"
        }, {
            name: "Sameapk",
            url: "https://sameapk.com/"
        }]
    }, {
        tag: "工具库",
        link: [{
            name: "sojson",
            url: "https://www.sojson.com/"
        }, {
            name: "toolzl",
            url: "http://www.toolzl.com/"
        }, {
            name: "bugscaner",
            url: "http://tools.bugscaner.com/"
        }, {
            name: "toollu",
            url: "https://tool.lu/"
        }, {
            name: "atool9",
            url: "http://www.atool9.com/"
        }, {
            name: "ssleye",
            url: "http://www.ssleye.com/"
        }, {
            name: "myssl",
            url: "https://myssl.com/"
        }]
    }, {
        tag: "日常工具",
        link: [{
            name: "滴答清单",
            url: "https://www.dida365.com/"
        }, {
            name: "百度脑图",
            url: "https://naotu.baidu.com/"
        }, {
            name: "进度猫",
            url: "https://www.jindumao.com/"
        }, {
            name: "有道云笔记",
            url: "http://note.youdao.com/web"
        }, {
            name: "幕布",
            url: "https://mubu.com/"
        }, {
            name: "Trello",
            url: "https://trello.com/"
        }, {
            name: "谷歌翻译",
            url: "https://translate.google.cn/"
        }]
    }, {
        tag: "图片工具",
        link: [{
            name: "图片压缩",
            url: "https://tinypng.com/"
        }, {
            name: "图像转矢量",
            url: "https://vectormagic.com/"
        }, {
            name: "无损放大",
            url: "http://www.bigjpg.com/"
        }, {
            name: "背景移除",
            url: "https://www.remove.bg/"
        }, {
            name: "Gif压缩",
            url: "http://tool.gifhome.com/"
        }, {
            name: "图片搜索",
            url: "https://www.tineye.com/"
        }, {
            name: "人脸搜索",
            url: "https://pimeyes.com/cn"
        }]
    }, {
        tag: "油管工具",
        link: [{
            name: "savefrom",
            url: "https://zh.savefrom.net/"
        }, {
            name: "clipconverter",
            url: "https://www.clipconverter.cc/"
        }, {
            name: "findyoutube",
            url: "https://www.findyoutube.net/"
        }, {
            name: "tubeninja",
            url: "https://www.tubeninja.net/zh-hans/"
        }, {
            name: "tubeoffline",
            url: "https://www.tubeoffline.com/"
        }, {
            name: "nsfwyoutube",
            url: "https://www.nsfwyoutube.com/"
        }, {
            name: "noxinfluencer",
            url: "https://cn.noxinfluencer.com/"
        }]
    }, {
        tag: "IP工具",
        link: [{
            name: "Opengps",
            url: "https://www.opengps.cn/"
        }, {
            name: "Ping",
            url: "http://ping.pe/"
        }, {
            name: "端口查询",
            url: "https://www.yougetsignal.com/tools/open-ports/"
        }, {
            name: "Diggui",
            url: "https://www.diggui.com/"
        }, {
            name: "IPIP",
            url: "https://www.ipip.net/"
        }, {
            name: "匿名查询",
            url: "https://whoer.net/"
        }, {
            name: "测速",
            url: "https://www.speedtest.cn/"
        }]
    }, {
        tag: "域名工具",
        link: [{
            name: "域名备案查询",
            url: "http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
        }, {
            name: "公安备案查询",
            url: "http://www.beian.gov.cn/portal/recordQuery"
        }, {
            name: "Chaicp",
            url: "http://www.chaicp.com/"
        }, {
            name: "哪煮米",
            url: "https://www.nazhumi.com/"
        }, {
            name: "sslforfree",
            url: "https://www.sslforfree.com/"
        }, {
            name: "域名解析查询",
            url: "https://dnsdb.io/zh-cn/"
        }, {
            name: "Freenom",
            url: "https://www.freenom.com/zh/index.html?lang=zh"
        }]
    }, {
        tag: "站点工具",
        link: [{
            name: "站点性能测试",
            url: "https://developers.google.com/speed/pagespeed/insights/"
        }, {
            name: "历史快照",
            url: "https://archive.org/"
        }, {
            name: "网站信息查询",
            url: "https://toolbar.netcraft.com/site_report?url="
        }, {
            name: "GTmetrix",
            url: "https://gtmetrix.com/"
        }, {
            name: "Pingdom",
            url: "https://fpt.pingdom.com/"
        }, {
            name: "Sitespeed",
            url: "http://sitespeed.me/"
        }, {
            name: "WAVE",
            url: "https://wave.webaim.org/"
        }]
    }, {
        tag: "Git",
        link: [{
            name: "Coding",
            url: "https://coding.net/"
        }, {
            name: "Github",
            url: "https://github.com"
        }, {
            name: "码云",
            url: "https://gitee.com/"
        }, {
            name: "Gitlab",
            url: "https://about.gitlab.com/"
        }, {
            name: "Bitbucket",
            url: "https://bitbucket.org/product/"
        }, {
            name: "百度效率云",
            url: "http://xiaolvyun.baidu.com/"
        }, {
            name: "Git搜索",
            url: "https://www.bithublab.org/"
        }]
    }, {
        tag: "国际站",
        link: [{
            name: "Youtube",
            url: "https://www.youtube.com/"
        }, {
            name: "Facebook",
            url: "https://www.facebook.com/"
        }, {
            name: "Twitter",
            url: "https://twitter.com/"
        }, {
            name: "Instagram",
            url: "https://www.instagram.com/"
        }, {
            name: "Telegram",
            url: "https://web.telegram.org/"
        }, {
            name: "Threads",
            url: "https://www.threads.net/"
        }, {
            name: "Ebay",
            url: "https://www.ebay.com/"
        }]
    }]
}]
 ! function(o) {
    "use strict"

    function t(t) {
        o(".work-link").find(".tab span.active").removeClass("active")
        var e, n, a = "",
            l = o(t).attr("class")
        if (o(t).addClass("active"), o.each(comm_list, function(t, i) {
                l == i.slug && (e = i.list, o.each(e, function(t, i) {
                    a += "<ul><li><a style='background:#fff;color:#999;'>" + i.tag + "</a></li>", n = i.link, o.each(n, function(o, t) {
                        a += '<li><a onclick="javascript:window.open(&#39;' + t.url + '&#39;)">' + t.name + "</a></li>"
                    }), a += "</ul>"
                }))
            }), o(".work-link").find(".tab span:first").hasClass("active") && "1" == i("schl")) {} else o(".work-link").css("opacity", "1").find(".info").hide().html(a).fadeIn(200)
    }

    function i(o) {
        var t = {
            bkgd: "#ededed",
            srch: "baidu",
            schl: "0",
            prov: "1",
            univ: "1001"
        }
        return Cookies.get(o) || t[o]
    }

    function e(o, t, i) {
        Cookies.set(o, t, {
            expires: i || 3650
        })
    }

    function n(t) {
        o("body").css("background", t)
    }

    function a(t) {
        if (o(t).addClass("active").siblings(".active").removeClass("active"), o(".search-hidden").remove(), o(t).hasClass("baidu")) o(".search-form").attr("action", "https://www.baidu.com/s"), o(".search-keyword").attr({
            name: "word",
            placeholder: "百度一下"
        })
        else if (o(t).hasClass("so")) o(".search-form").attr("action", "https://www.so.com/s"), o(".search-keyword").attr({
            name: "q",
            placeholder: "360 搜索"
        })
        else if (o(t).hasClass("sogou")) o(".search-form").attr("action", "https://www.sogou.com/web"), o(".search-keyword").attr({
            name: "query",
            placeholder: "搜狗搜索"
        })
        else if (o(t).hasClass("google")) o(".search-form").attr("action", "https://www.google.com/search"), o(".search-keyword").attr({
            name: "q",
            placeholder: "Google 搜索"
        })
        else if (o(t).hasClass("yahoo")) o(".search-form").attr("action", "https://search.yahoo.com/search"), o(".search-keyword").attr({
            name: "p",
            placeholder: "Yahoo 搜索"
        })
        else if (o(t).hasClass("bing")) o(".search-form").attr("action", "https://cn.bing.com/search"), o(".search-keyword").attr({
            name: "q",
            placeholder: "Bing 搜索"
        })
        else if (o(t).hasClass("image")) {
            o(".search-form").attr("action", "https://cn.bing.com/images/search"), o(".search-keyword").attr({
                name: "q",
                placeholder: "图片搜索"
            })
            var i = new Image
            i.src = "https://images.google.com/favicon.ico?" + Date.now(), i.onload = function() {
                o(".search-form").attr("action", "https://www.google.com/search"), o(".search-form").prepend('<input class="search-hidden" type="hidden" name="tbm" value="isch">')
            }
        } else if (o(t).hasClass("fy")) {
            o(".search-form").attr("action", "https://fanyi.sogou.com/text"), o(".search-keyword").attr({
                name: "keyword",
                placeholder: "搜狗翻译"
            })
            var i = new Image
            i.src = "https://images.google.com/favicon.ico?" + Date.now(), i.onload = function() {
                o(".search-form").attr("action", "https://translate.google.com/"), o(".search-keyword").attr({
                    name: "q",
                    placeholder: "Google翻译"
                })
            }
            
        } else if (o(t).hasClass("wiki")) {
            o(".search-form").attr("action", "https://baike.baidu.com/search"), o(".search-keyword").attr({
                name: "word",
                placeholder: "百科全书"
            })
            var i = new Image
            i.src = "https://zh.wikipedia.org/favicon.ico?" + Date.now(), i.onload = function() {
                o(".search-form").attr("action", "https://zh.wikipedia.org/w/index.php"), o(".search-keyword").attr("name", "search")
            }
        } else if (o(t).hasClass("torrent")) o(".search-form").attr("action", "https://zh.btdb.to/search"), o(".search-keyword").attr({
            name: "q",
            placeholder: "磁力链，种子搜索"
        })
        else if (o(t).hasClass("scholar")) {
            o(".search-form").attr("action", "https://xueshu.baidu.com/s"), o(".search-keyword").attr({
                name: "wd",
                placeholder: "中英文文献检索"
            })
            var i = new Image
            i.src = "https://scholar.google.com/favicon.ico?" + Date.now(), i.onload = function() {
                o(".search-form").attr("action", "https://scholar.google.com/scholar"), o(".search-keyword").attr({
                    name: "q"
                }), o(".search-form").prepend('<input class="search-hidden" type="hidden" name="hl" value="zh-CN">')
            }
        }
        o(".search-keyword").focus()
    }
    var l = o(window)
    o.ajaxSetup({
        cache: !0
    }), l.on("load", function() {
        n(i("bkgd")), t(o(".work-link").find(".tab span:first")), a(o(".search-tab").find("span." + i("srch")))
    }), o(".work-link .tab").on("click", "span", function() {
        t(o(this))
    }), o(".search-tab").on("click", "span", function() {
        a(o(this)), e("srch", this.className.split(" ")[0])
    })
}(jQuery)