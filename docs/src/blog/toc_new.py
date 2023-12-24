import os
import urllib.parse


def generate_toc(folder_path, level=1, base_path="", parent_dir="", open_all=True):
    toc = []
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        encoded_item = urllib.parse.quote(item, safe="")  # 对文件或文件夹名称进行URL编码
        if os.path.isdir(item_path):
            if open_all:
                toc.append(
                    f"<details open><summary>{level}. {parent_dir}/{item}/</summary>"
                )
            else:
                toc.append(f"<details><summary>{level}. {parent_dir}/{item}/</summary>")
            toc.append("<ul>")
            toc.extend(
                generate_toc(
                    item_path,
                    level + 1,
                    f"{base_path}{encoded_item}/",
                    f"{parent_dir}/{item}",
                    open_all,
                )
            )
            toc.append("</ul>")
            toc.append("</details>")
        elif os.path.isfile(item_path) and item.endswith(".md"):
            toc.append(
                f"<li>{level}. <a href='{base_path}{encoded_item}'>{item}</a></li>"
            )
    return toc


def main(root_folder):
    toc = generate_toc(root_folder, open_all=True)  # 默认全部展开
    with open(os.path.join(root_folder, "toc.md"), "w", encoding="utf-8") as toc_file:
        toc_file.write("\n".join(toc))


if __name__ == "__main__":
    root_folder = "./"  # 请将此路径替换为你的文件夹路径
    main(root_folder)
