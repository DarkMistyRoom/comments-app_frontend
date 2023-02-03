export interface Comment {
  id: string,
  body: string,
  userName: string,
  userEmail: string,
  homePage?: string,
  parentId: string | null,
  createdAt: string,
  file: string[],
};

export interface CommentsState {
  [key: number]: Comment[],
}

