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


### Types

These are the types used in the canister.

#### Member

```ts
class Member {
  id: string;
  username: string;
  name: string;
  tagline?: string | null;
  bio?: string | null;
  image?: string | null;
  genres?: string[];
  createdAt: Date;
  updatedAt?: Date | null;
  blogs: string[];
}
```

This is the type of a member. A member can have one or more blogs.


#### Blog

```ts
class Blog {
  id: string;
  userId: string;
  name: string;
  about: string;
  socials: Record<string, string>;
  series: string[];
  posts: string[];
  createdAt: Date;
  updatedAt: Date | null;
}
```

This is the type of a blog. A blog can have one or more posts. A blog can also have one or more series. Series are a collection of posts.


#### Series

```ts
class Series {
  id: string;
  name: string;
  userId: string;
  blogId: string;
  description: string;
  cover_image?: string | null;
  genres?: string[];
  sorting: SeriesSorting;
  posts: string[];
  createdAt: Date;
  updatedAt?: Date | null;
}
```

This is the type of a series. A series can have one or more posts.


#### Post & Comment

```ts
class Post {
  id: string;
  userId: string;
  blogId: string;
  seriesId?: string | null;
  status: PostStatus;
  title: string;
  slug: string;
  subtitle?: string | null;
  content: string;
  genres?: string[];
  cover_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  comment_enabled: boolean;
}

class Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}
```

This is the type of a post and a comment. A post can have one or more comments.

### Endpoints

These are the endpoints available in the canister.

#### Create a user

Endpoint: `POST /auth/register`
Sample payload:

```json
{
    "username": "testing102",
    "name": "john doe",
    "tagline": "amazing developer"
}
```

#### Get a user by id

Endpoint: `GET /auth/account/:id`

#### Get a user by username

Endpoint: `GET /auth/account/by-username/:username`

#### Update a user

Endpoint: `PATCH /auth/account/:id`

Sample payload:

```json
{
    "name": "john doe",
    "tagline": "amazing developer",
    "bio": "I am an amazing developer",
    "genres": []
}
```

#### Delete a user

Endpoint: `DELETE /auth/account/:id`

#### Get all users

Endpoint: `GET /auth/account/list`

#### Create a blog

Endpoint: `POST /blogs/create/:userId`

Sample payload:

```json
{
    "name": "Blockchainer",
    "about": "amazing developer",
    "socials": {
        "twitter": "https://x.com/netrobeweb"
    }
}
```

#### Get a blog by id

Endpoint: `GET /blogs/:id`

#### Update a blog

Endpoint: `PATCH /blogs/:id`

Sample payload:

```json
{
    "name": "Blockchainer - [UPDATED]",
    "about": "amazing developer",
    "socials": {
        "twitter": "https://x.com/netrobeweb",
        "github": "https://x.com/netrobeweb"
    }
}
```

#### Delete a blog

Endpoint: `DELETE /blogs/:id`

#### Get all blogs

Endpoint: `GET /blogs`

#### Get all series

Endpoint: `GET /series`

#### Get all user series

Endpoint: `GET /series/list/user/:userId`

#### Get all blog series

Endpoint: `GET /series/list/blog/:blogId`

#### Create a series

Endpoint: `POST /series/create/:userId`

Sample payload:

```json
{
    "blogId": "533e2a5a-a92e-41ad-a2b8-4054036e908e",
    "name": "Creating an NFT Collection on ICP",
    "description": "amazing developer",
    "sorting": "oldest_first",
    "genres": ["blockchain"],
    "cover_image": null
}
```

#### Get a series by id

Endpoint: `GET /series/:id`

#### Update a series

Endpoint: `PATCH /series/:id`

Sample payload:

```json
{
    "name": "Creating an NFT Collection on ICP",
    "description": "amazing developer",
    "sorting": "oldest_first",
    "genres": ["blockchain"],
    "cover_image": null
}
```

#### Delete a series

Endpoint: `DELETE /series/:id`

#### Get all posts

Endpoint: `GET /posts`

#### Get all user posts

Endpoint: `GET /posts/user/:userId`

#### Get all blog posts

Endpoint: `GET /posts/blog/:blogId`

#### Get all series posts

Endpoint: `GET /posts/series/:seriesId`

#### Create a post

Endpoint: `POST /posts/create/:userId`

Sample payload:

```json
{
    "blogId": "f9579672-c745-4256-89d1-11d1833b5dba",
    "title": "Creating an NFT Collection on ICP",
    "subtitle": "amazing developer",
    "status": "draft",
    "slug": "creating-an-nft-collection-on-icp",
    "genres": ["blockchain"],
    "content": "# Hi today we will learn about NFTs",
    "comment_enabled": true
}
```

#### Get a post by id

Endpoint: `GET /posts/:id`

#### Update a post

Endpoint: `PATCH /posts/:id`

Sample payload:

```json
{
    "status": "published",
    "comment_enabled": true
}
```

#### Delete a post

Endpoint: `DELETE /posts/:id`

#### Create post comment

Endpoint: `POST /posts/:userId/comment`

Sample payload:

```json
{
    "postId": "20883cb4-155f-437d-90c0-6001fd61f9fd",
    "content": "# Hi today we will learn about NFTs"
}
```

#### Delete a post comment

Endpoint: `DELETE /posts/:postId/comment/:commentId`

### Simple Use case

1. A user creates an account
2. A user creates a blog
3. A user creates a series
4. A user creates a post
5. A user creates a comment on a post
