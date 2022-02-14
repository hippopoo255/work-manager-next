export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  token: Scalars['String']
  user: User
}

export type Blog = {
  __typename?: 'Blog'
  body: Scalars['String']
  created_at?: Maybe<Scalars['Date']>
  id: Scalars['ID']
  status: BlogStatus
  tags: Array<Tag>
  title: Scalars['String']
  updated_at?: Maybe<Scalars['Date']>
  createdBy?: Maybe<User>
}

export enum BlogStatus {
  Done = 'done',
  Pending = 'pending',
}

export type CreateBlogInput = {
  body: Scalars['String']
  status: BlogStatus
  tags: Array<Maybe<TagInput>>
  title: Scalars['String']
  createdBy: CreatedBy
}

export type ListWithPager = {
  __typename?: 'ListWithPager'
  items?: Maybe<Array<Maybe<Blog>>>
  nextToken?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createBlog: Blog
  deleteBlog: Blog
  signIn?: Maybe<AuthPayload>
  signUp?: Maybe<AuthPayload>
  updateBlog: Blog
}

export type MutationCreateBlogArgs = {
  input: CreateBlogInput
}

export type MutationDeleteBlogArgs = {
  id: Scalars['String']
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type MutationUpdateBlogArgs = {
  id: Scalars['String']
  input: UpdateBlogInput
}

export type Query = {
  __typename?: 'Query'
  blog?: Maybe<Blog>
  blogs?: Maybe<ListWithPager>
  tags?: Maybe<Array<Tag>>
  users: Array<User>
}

export type QueryBlogArgs = {
  id: Scalars['String']
}

export type QueryBlogsArgs = {
  nextToken?: Maybe<Scalars['String']>
  query?: Maybe<QueryInput>
}

export type QueryInput = {
  tag?: Maybe<Scalars['String']>
}

export type SignInInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignUpInput = {
  email: Scalars['String']
  name: Scalars['String']
  password: Scalars['String']
  password_confirmation: Scalars['String']
}

export type Tag = {
  __typename?: 'Tag'
  created_at?: Maybe<Scalars['Date']>
  id: Scalars['ID']
  name: Scalars['String']
  updated_at?: Maybe<Scalars['Date']>
}

export type TagInput = {
  id?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type UpdateBlogInput = {
  body: Scalars['String']
  status: BlogStatus
  tags: Array<Maybe<TagInput>>
  title: Scalars['String']
  createdBy: CreatedBy
}

export type User = {
  __typename?: 'User'
  created_at?: Maybe<Scalars['Date']>
  email: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
  updated_at?: Maybe<Scalars['Date']>
}

export type CreatedBy = {
  id: Scalars['String']
  name: Scalars['String']
}
