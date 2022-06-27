import axios from "axios";
import rootUrl from "../../rootUrl";

const regionUrl = rootUrl + "/api/regions";

const actions = {
  fetchRegions(context) {
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
    axios.get(regionUrl).then(response => {
      context.commit("SET_REGION", response.data);
      context.commit("LOADING_STATUS", false, { root: true });
    });
  },
  storeRegion(context, data) {
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
    axios
      .post(regionUrl, data)
      .then(response => {
        context.commit("STORE_REGION", response.data);
        context.commit("DIALOG_STATUS", false, { root: true }); // close dialog
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading

        let payload = [
          { status: true, message: "Region successfully added.", timeout: 3000 }
        ];
        context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
      })
      .catch(error => {
        context.commit("REGION_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },
  updateRegion(context, region) {
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
    axios
      .put(regionUrl + "/update", region)
      .then(response => {
        context.commit("UPDATE_REGION", response.data);
        context.commit("DIALOG_STATUS", false, { root: true }); // close dialog
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading

        let payload = [
          {
            status: true,
            message: "Region successfully updated.",
            timeout: 3000
          }
        ];
        context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
      })
      .catch(error => {
        context.commit("REGION_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },
  deleteRegions(context, regionIds) {
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
    axios
      .patch(regionUrl + "/delete/multiple", regionIds)
      .then(response => {
        context.commit("DELETE_REGIONS", response.data);
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading

        let payload = [
          {
            status: true,
            message: "Region(s) successfully deleted.",
            timeout: 3000
          }
        ];
        context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
};

export default actions;
