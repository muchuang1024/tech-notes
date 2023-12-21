import os


# Function to generate markdown index for a given directory with clickable links for files
def generate_markdown_index_with_links(path, base_path="", level=0):
    markdown = ""
    if level == 0:
        markdown += (
            "# " + os.path.basename(path) + "\n\n"
        )  # Top level directory as a header
    else:
        markdown += (
            "\n" + "#" * level + " " + os.path.basename(path) + "\n\n"
        )  # Subdirectories as headers

    # Sort directory contents by directories first then files
    dir_contents = sorted(
        os.listdir(path),
        key=lambda x: (os.path.isfile(os.path.join(path, x)), x.lower()),
    )
    for item in dir_contents:
        item_path = os.path.join(path, item)
        relative_item_path = os.path.join(base_path, item)
        if os.path.isdir(item_path):  # If the item is a directory
            # Recurse into subdirectories, updating the base path
            markdown += generate_markdown_index_with_links(
                item_path, relative_item_path, level + 1
            )
        else:
            # Add files as list items with links
            markdown += (
                "- [" + item + "](" + relative_item_path.replace(" ", "%20") + ")\n"
            )
    return markdown


# Replace with the path to your project directory
project_dir = "./"

# Generate and print the markdown index with links
markdown_index_with_links = generate_markdown_index_with_links(project_dir)
print(markdown_index_with_links)
