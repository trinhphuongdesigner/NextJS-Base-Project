import Link from 'next/link';

const Post = (props) => {
  const { slug, title } = props;
  return (
    <li>
      <Link
        as={`/${slug}`}
        href={`/post?title=${title}`}
      >
        <a>{title}</a>
      </Link>
    </li>
  );
};

const PostList = () => (
  <div>
    <h2>My blog</h2>
    <ul>
      <Post slug="yet-another-post" title="Yet another post" />
      <Post slug="second-post" title="Second post" />
      <Post slug="hello-world" title="Hello, world!" />
    </ul>
  </div>
);

export default PostList;
