import shutil
import subprocess
import os
import git

# Set the paths to the yolo-labs and yolo-labs-site directories
yolo_labs_path = ""
yolo_labs_site_path = "../yolo-labs-site"

# # Change the current working directory to yolo-labs
# os.chdir(yolo_labs_path)

# print out the working directory
print("Working directory: " + os.getcwd())

# Build the current project by running "npm run build"
# subprocess.run(["npm", "run", "build"])
subprocess.run(["C:\\Program Files\\nodejs\\npm.cmd", "run", "build"])

# Get the latest on a different repository (git@github.com:neowire/yolo-labs-site.git)
yolo_labs_site_repo = git.Repo(yolo_labs_site_path)
yolo_labs_site_repo.remotes.origin.fetch()
# yolo_labs_site_repo.git.reset("--hard", "origin/master")

# Copy the latest from yolo-labs/dist to the root of yolo-labs-site
#shutil.rmtree(yolo_labs_site_path)
#remove everything but .git directory from yolo-labs-site
for root, dirs, files in os.walk(yolo_labs_site_path, topdown=True):
    if ".git" in dirs:
        dirs.remove(".git")
        
    for name in files:
        if name != ".git":
            os.remove(os.path.join(root, name))
    for name in dirs:
        if name != ".git":
            os.rmdir(os.path.join(root, name))

shutil.copytree(os.path.join(yolo_labs_path, "build"), yolo_labs_site_path, dirs_exist_ok=True)

# Commit and push the changes to yolo-labs-site repository
yolo_labs_site_repo.git.add(".")
yolo_labs_site_repo.index.commit("Update dist")
yolo_labs_site_repo.remotes.origin.push()
