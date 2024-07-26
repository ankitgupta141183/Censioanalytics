import axios from "axios"

var apiUrl = global.platformURI
export const ExportGameData = (gameId, checkedState, type = "Games") => {
  return  axios.get(
        apiUrl + `/api/v1/exports?game_id=${gameId}`, { params: { id: checkedState, export_type: type } }
    )
        .then(response => {
            return response
        }).catch((err) => {
            return err
        })
}