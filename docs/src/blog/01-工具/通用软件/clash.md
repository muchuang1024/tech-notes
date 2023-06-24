解决打开clashx之后，mac系统配置的hosts就会失效

https://github.com/Dreamacro/clash/issues/423

打开配置文件，编辑config.yaml

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/wecom-temp-4a786b6af2b42dda9bc72eda04acd0b3.png)

dns:
    enable: true
    ipv6: false
    nameserver:

        - 1.2.4.8
                - 114.114.114.114
                - 223.5.5.5
                        - tls://dns.rubyfish.cn:853



将enable改成false