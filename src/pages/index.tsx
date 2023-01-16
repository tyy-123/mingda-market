// import styles from './index.less';

// export default function IndexPage() {
//   return (
//     <div>
//       <h1 className={styles.title}>Page index</h1>
//     </div>
//   );
// }
import { Redirect } from 'umi';

function IndexPage() {
  return <Redirect to="/market" />;
}

export default IndexPage;