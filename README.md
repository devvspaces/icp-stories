# ICP Stories

ICP Stories is a simple story sharing platform built on the Internet Computer. It allows users to create, read, update, and delete stories. Users can create one or more blogs and share their stories with the world.

## Prerequisites

1. Install `nvm`:

    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

2. Switch to node v20:

    - `nvm install 20`
    - `nvm use 20`

3. Install build dependencies:

    For Ubuntu and WSL2

    ```shell
    sudo apt-get install podman
    ```

    For macOS

    ```shell
    xcode-select --install
    brew install podman
    ```

4. Install `dfx`

    - `DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"`

5. Add `dfx` to PATH:

    - `echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"`

6. Clone the repository:

    - `git clone`

7. Run a local replica

    - `dfx start --host 127.0.0.1:8000`

    > If you make any changes to the `StableBTreeMap` structure like change datatypes for keys or values, changing size of the key or value, you need to restart `dfx` with the `--clean` flag. `StableBTreeMap` is immutable and any changes to it's configuration after it's been initialized are not supported.

    - `dfx start --host 127.0.0.1:8000 --clean`

8. Deploy the canister

    - `dfx deploy`
    Also, if you are building an HTTP-based canister and would like your canister to autoreload on file changes (DO NOT deploy to mainnet with autoreload enabled):

    ```shell
    AZLE_AUTORELOAD=true dfx deploy
    ```

9. Stop a local replica

- `dfx stop`

## Interacting with the canister

When a canister is deployed, `dfx deploy` produces a link to the Candid interface in the shell output.

Candid interface provides a simple UI where you can interact with functions in the canister.

On the other hand, you can interact with the canister using `dfx` via CLI:

### Get the canister id

- `dfx canister id <CANISTER_NAME>`

Example:

```shell
$ dfx canister id icp_stories
bkyz2-fmaaa-aaaaa-qaaaq-cai
```

Now, the URL of your canister should like this:

```text
http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000
```

With this URL, you can interact with the canister using an HTTP client of your choice. We are going to use `curl`.

Then using Postman or curl, you can interact with the canister.