import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePermission, fetchUsers } from '../../../redux/actions/adminActions/adminActions';

const UserList = () => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const users = useSelector(state => state.admin.users);

  // Fetch All Users.
  const getUsers = async () => {
    dispatch(fetchUsers(token))
  };

  useEffect(() => {
    async function getData() {
      // Call the getUsers function when the component mounts
      await getUsers();
    }

    getData();
  }, []);

  const handlePermissionChange = async (userId) => {
    await dispatch(changePermission(token, admin._id, userId, users));
    await getUsers();
  };

  return (
    <div className="p-8">
      <div className="bg-indigo-900 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold px-4 py-2">All Users</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-4 border-indigo-900  text-white bg-indigo-600 rounded-md px-4 py-2">User</th>
              <th className="border-4 border-indigo-900  text-white bg-indigo-600 rounded-md px-4 py-2">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-4 border-indigo-900  bg-indigo-600 rounded-md text-white px-4 py-2">
                  <div className="text-center cursor-pointer">{user.email}</div>
                </td>
                <td className="border-4 border-indigo-900  bg-indigo-600 rounded-md px-4 py-2">
                  <div className="text-center">
                    <input
                      type="checkbox"
                      checked={user.active}
                      onChange={() => handlePermissionChange(user._id)}
                      className="cursor-pointer"
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
