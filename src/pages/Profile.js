import { useAuth } from '../helpers/Helpers';

const Profile = () => {
    const auth = useAuth();

    return (<>
        <div className="container">
            <div className="d-flex justify-content-center mt-3">
                <div className="card p-1">
                    <p>Name: <strong>{auth.user.name}</strong></p>
                    <p>Last Name: <strong>{auth.user.lastname}</strong></p>
                    <p>Email: <strong>{auth.user.email}</strong></p>
                    <p>Phone: <strong>{auth.user.phone}</strong></p>
                </div>
            </div>
        </div>
    </>);
}

export default Profile;