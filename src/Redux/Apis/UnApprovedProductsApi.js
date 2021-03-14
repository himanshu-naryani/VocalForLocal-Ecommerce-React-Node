import axios  from 'axios'

export async function unApprovedProductsApi() {
    return await axios.get('/products/unapproved')
  };
