import axios from 'axios';

const downloadHelper = async (url, name) => {
  axios
    .get(url, { responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlDownload = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlDownload;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(urlDownload);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { downloadHelper };
