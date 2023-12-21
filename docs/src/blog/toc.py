import os


def generate_markdown_from_directory(path):
    markdown_content = "---\n"
    for root, dirs, files in os.walk(path):
        # Skip the root directory itself
        if root == path:
            continue

        # Find the depth of the current directory
        depth = root[len(path) :].count(os.sep)

        # Format the directory name based on the depth
        if depth == 1:
            markdown_content += f"# {os.path.basename(root)}\n\n"
        elif depth == 2:
            markdown_content += f"## {os.path.basename(root)}\n\n"

        # Add files as list items
        for file in files:
            # Create a relative path to the file
            rel_path = os.path.relpath(os.path.join(root, file), path)
            # Replace spaces with %20 for markdown URL encoding
            rel_path_encoded = rel_path.replace(" ", "%20")
            # Format based on the depth of the directory
            if depth == 1:
                markdown_content += f"### [{file}]({rel_path_encoded})\n"
            elif depth == 2:
                markdown_content += f"- [{file}]({rel_path_encoded})\n"

    markdown_content += "---\n"
    return markdown_content.strip()


# Set the path to the root of your project directory
project_path = "./"

# Generate the markdown content
markdown_content = generate_markdown_from_directory(project_path)

# Output the content to a markdown file
with open(os.path.join(project_path, "README.md"), "w") as md_file:
    md_file.write(markdown_content)
