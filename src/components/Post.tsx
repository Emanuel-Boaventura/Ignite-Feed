import { format, formatDistanceToNow } from 'date-fns';
import { set } from 'date-fns/esm';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import Comment from './Comment';
import styles from './Post.module.css';

interface Content {
  contentType: 'paragraph' | 'link';
  content: string;
}

export interface PostProps {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: Date;
  content: Content[];
}

const Post = ({ author, content, publishedAt }: PostProps) => {
  const [comments, setComments] = useState(['Post muito bacana, hein?!']);
  const [newComment, setNewComment] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const isNewCommentEmpty = newComment.length === 0;

  function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('');
    setNewComment(e.target.value);
  }

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault();

    setComments([...comments, newComment]);
    setNewComment('');
  }

  function handleNewCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.contentType === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.contentType === 'link') {
            return (
              <p key={line.content}>
                <a href='#'>{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário...'
          onChange={handleNewCommentChange}
          value={newComment}
          onInvalid={handleNewCommentInvalid}
          required
        ></textarea>
        <footer>
          <button disabled={isNewCommentEmpty} type='submit'>
            Comentar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
};

export default Post;
