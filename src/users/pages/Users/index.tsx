import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import ErrorModal from '../../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import { RootState } from '../../../reducers'
import { getUsers, setError } from '../../../ducks/users'
import UsersList from "../../components/UsersList";

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const { usersList, isLoading, error } = useSelector((state: RootState) => state.users)
  const clearErrorHandler = () => dispatch(setError(null))
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (isLoading) {
    return <LoadingSpinner asOverlay />
  }

  return <React.Fragment> <ErrorModal error={error} onClear={clearErrorHandler} /><UsersList usersList={usersList} /></React.Fragment>;
};

export default Users;
