import Crawler from 'crawler'
import DAO from './dao'
import App from './app'

const dao = new DAO(':memory:')
const crawler = new Crawler({})
App({dao, crawler})
