import axios  from 'axios'

export async function makeAdminApi(email) {
    return await axios.patch('/users/makeadmintrue' , {"userEmail":email})
  };