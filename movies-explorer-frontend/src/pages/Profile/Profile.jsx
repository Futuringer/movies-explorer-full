import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Layout from '../../components/Layout/Layout';

import styles from './Profile.scss';

function Profile({ loggedIn, openPopup, ...restProps }) {
  return (
    <Layout loggedIn={loggedIn} noFooter openPopup={openPopup}>
      <div className="profile-container">
        <ProfileForm {...restProps}></ProfileForm>
      </div>
    </Layout>
  );
}

export default Profile;
