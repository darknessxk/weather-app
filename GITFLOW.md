# Git Flow

We will be following this Git Flow pattern with strict rules for future commits

### Commits

* Every commit **MUST** be signed by their respective author
* Every commit description **MUST** be short as possible
  * Use a few words as imperative as possible
  * We encourage micro commits
    * 1 to 3 files

### Branches

* **main**
  * Production environment
  * Can not be use as base branch
    * Exception: Only use as base branch if is to create hotfixes
* **dev**
  * Development environment
  * Can be used as base branch
* **feature/**
  * **MUST** be based into dev branch
  * **MUST** pull request to **dev** branch
* **task/**
  * **MUST** be based into its own feature or dev branch if it is a single task without a base feature
  * **MUST** pull request to **feature** or **dev** depending on which one it is based

### Pull Requesting

* Every request **MUST** update the changelog file properly
* Every request **MUST** have unit tests for every change that can be properly tested
* Every request **MUST** be reviewed by a third-party
