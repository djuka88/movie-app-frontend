import httpService, {} from './HttpService'
import { endpoints, HTTP_METHODS } from '../constants'

class MovieService {
    getAllMovies = async () => {
        const response = await httpService.request({
            url: endpoints.MOVIES,
            method: HTTP_METHODS.GET
        })

        return response;
    }
}

const movieService = new MovieService()
export default movieService