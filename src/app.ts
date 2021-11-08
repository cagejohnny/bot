import DAO from './dao'
import UserRepository from './users'

function App({dao, crawler}) {
    const usersRepo = new UserRepository(dao)

}

export default App