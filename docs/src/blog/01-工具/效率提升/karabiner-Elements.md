# Karabiner

## 介绍

[https://github.com/pqrs-org/Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements)

Karabiner-Elements 是一个强大的改键软件，用于在 macOS Sierra 或更高版本上自定义键盘按键。

## 安装

[https://karabiner-elements.pqrs.org/](https://karabiner-elements.pqrs.org/)选择指定平台进行下载安装

## 配置

- 简单将一个键修改成另一个键，直接在`Simple modifications`配置即可
- 复杂的改键任务，在`complex modifications`选择从 [rules库](https://ke-complex-modifications.pqrs.org/)导入将手写json配置放到~/.config/karabiner/assets/complex_modifications目录下，然后界面上选择`Enable`即可

这里以修改方向按键为例：

将Ctrl+IJKL变成方向键的json如下：

```
{
    "title": "方向映射",
    "rules": [
        {
            "description": "将ctrl+IJKL变成方向键",
            "manipulators": [
                {
                    "type": "basic",
                    "from": {
                        "key_code": "i",
                        "modifiers": {
                            "mandatory": ["control"],
                            "optional": ["any"]
                        }
                    },
                    "to": [{"key_code": "up_arrow"}]
                },
                {
                    "type": "basic",
                    "from": {
                        "key_code": "j",
                        "modifiers": {
                            "mandatory": ["control"],
                            "optional": ["any"]
                        }
                    },
                    "to": [{"key_code": "left_arrow"}]
                },
                {
                    "type": "basic",
                    "from": {
                        "key_code": "k",
                        "modifiers": {
                            "mandatory": ["control"],
                            "optional": ["any"]
                        }
                    },
                    "to": [{"key_code": "down_arrow"}]
                },
                {
                    "type": "basic",
                    "from": {
                        "key_code": "l",
                        "modifiers": {
                            "mandatory": ["control"],
                            "optional": ["any"]
                        }
                    },
                    "to": [{"key_code": "right_arrow"}]
                }
            ]
        }
    ]
}
```

更多配置方法：[https://karabiner-elements.pqrs.org/docs/](https://karabiner-elements.pqrs.org/docs/)

## 使用

上下左右：ctrl+i/j/k/l
