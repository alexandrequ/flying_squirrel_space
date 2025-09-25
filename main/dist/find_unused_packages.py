import os
import subprocess


# Step 1: List all installed packages in the current Conda environment
def list_installed_packages():
    result = subprocess.run(
        ["conda", "list", "--export"], capture_output=True, text=True
    )
    installed_packages = result.stdout.splitlines()
    installed_packages = [
        pkg.split("=")[0] for pkg in installed_packages if not pkg.startswith("#")
    ]
    return set(installed_packages)


# Step 2: List all imported packages in your code
def list_imported_packages(directory="."):
    imported_packages = set()
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".py"):
                with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                    lines = f.readlines()
                    for line in lines:
                        if line.startswith("import ") or line.startswith("from "):
                            pkg = line.split()[1].split(".")[0]
                            imported_packages.add(pkg)
    return imported_packages


# Step 3: Compare the lists to find unused packages
def find_unused_packages(installed_packages, imported_packages):
    return installed_packages - imported_packages


# Step 4: Remove unused packages
def remove_unused_packages(unused_packages):
    for pkg in unused_packages:
        subprocess.run(["conda", "remove", "-y", pkg])


# Main execution
if __name__ == "__main__":
    conda_env_directory = "."  # Change to your project directory if needed
    installed_packages = list_installed_packages()
    imported_packages = list_imported_packages(conda_env_directory)
    unused_packages = find_unused_packages(installed_packages, imported_packages)

    print("Unused packages in the Conda environment:")
    for pkg in unused_packages:
        print(pkg)

    # Confirm before removing
    confirmation = (
        input("Do you want to remove the unused packages? (yes/no): ").strip().lower()
    )
    if confirmation == "yes":
        remove_unused_packages(unused_packages)
        print("Unused packages have been removed.")
    else:
        print("Operation canceled.")
