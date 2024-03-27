import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserList.css"
import { changePermission, fetchUsers } from '../../../redux/actions/adminActions/adminActions';

const UserList = () => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const users = useSelector(state => state.admin.users)
  console.log("Users", users)

  // Fetch All Users.
  const getUsers = async () => {
    dispatch(fetchUsers(token))
  };

  useEffect(() => {
    async function getData() {
      // Call the getUsers function when the component mounts
      await getUsers();
    }

    getData()
  }, []);

  const handlePermissionChange = async (userId) => {
    console.log(userId)
    dispatch(changePermission(token, admin._id, userId, users,))
  };

  return (
    <div className="dashboard">
      <div className="UserList">
        <h2 className="heading">All Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th center l">User</th>
              <th className="th center l">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="td">
                  <div style={{ cursor: "pointer" }} className="center">
                    {user.email}
                  </div>
                </td>

                <td className="td center">
                  <div>
                    <input
                      style={{ cursor: "pointer" }}
                      type="checkbox"
                      checked={user.active}
                      onChange={() => handlePermissionChange(user._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
