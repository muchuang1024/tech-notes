import os


def generate_markdown_directory(folder_path, depth=0, base_path=""):
    # 获取当前文件夹下的文件和子文件夹
    items = os.listdir(folder_path)
    toc = ""

    for item in sorted(items):
        item_path = os.path.join(folder_path, item)

        # 如果是文件夹，递归处理
        if os.path.isdir(item_path):
            # 处理文件夹名中的空格和特殊字符并编码
            folder_name = item.replace(" ", "%20")
            folder_name = folder_name.replace("#", "%23")

            # 生成对应层级的Markdown标题
            toc += f"{'  ' * depth}- [{item}]({base_path}/{folder_name}/README.md)\n"
            # 递归处理子文件夹
            toc += generate_markdown_directory(
                item_path, depth + 1, f"{base_path}/{folder_name}"
            )
        # 如果是文件且以.md结尾，直接生成Markdown标题
        elif os.path.isfile(item_path) and item.endswith(".md"):
            # 处理文件名中的空格和特殊字符并编码
            file_name = item.replace(" ", "%20")
            file_name = file_name.replace("#", "%23")
            file_path = os.path.join(base_path, file_name)
            toc += f"{'  ' * depth}- [{item}]({file_path})\n"

    return toc


# 指定当前文件夹
folder_path = "."

# 生成Markdown目录
markdown_directory = generate_markdown_directory(
    folder_path, 0, os.path.basename(folder_path)
)

# 生成toc.md文件
with open("README.md", "w") as toc_file:
    toc_file.write(markdown_directory)
