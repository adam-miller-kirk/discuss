import type { Comment } from "@prisma/client";
import { cache } from "react";
import { db } from "@/db";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

/*
  NOTE: This method place API calls into the cache and if a similar call
  is made then it will check if it has the same params. If it does it will
  only return the first call. The example below can be passed to each post
  and the post will try and make the same API call but this cache system
  stops the duplicates and it will take its result from the cache.

  NOTE: This behaviour is default when using the fetch method from react
*/

export const fetchCommentsByPostIdWithCache = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);
