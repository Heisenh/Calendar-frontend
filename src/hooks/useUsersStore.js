import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onLoadingUsers } from "../store/user/userSlice";

export const useUsersStore = () => {

  const dispatch = useDispatch();
  const {users} = useSelector(state => state.users);

  const startLoadingUsers = async() => {
    try {
      const {data} = await calendarApi.get('/users');
      dispatch(onLoadingUsers(data));
    } catch (error) {
      console.log(error);
    }
  };


  return {
    //* Properties
    users,
    //* Methods
    startLoadingUsers,
  }

}
