import React from 'react'
import {connect} from 'react-redux'
import Dashboard from './SidebarComponent'
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert';
 function Admin(props) {

    
    let isAdmin = ""
    const history = useHistory()

    if (props.user.data && props.user.data.userdata)
        isAdmin = props.user.data.userdata.userIsAdmin
    if(!isAdmin)    
        {   if(history) ///test
            history.push('/')
        swal("Oops!", "Something went wrong!", "error");
    }

    return (
        
        <div>
             <Dashboard></Dashboard>

        </div>
  
    )
}

const mapStateToProps = (state) => ({
    user: state.signin.data
})



export default connect(mapStateToProps, null)(Admin)
