import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import './TransferAdmin.css'
import {emailSchema} from '../../Validations/Validate'
import {connect} from 'react-redux'
import {makeAdmin} from '../../Redux/Actioncreators/AdminActions'
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal'
import StatusBar from '../../Shared/SnackBars/SuccessSnackBar'


 function TransferAdmin(props) {
    const [search , setSearch] = useState('')
    const [emptyvalue , setEmptyvalue] = useState(false)
    const [modalShow , setModalShow] = useState(false)
    const [initial, setinitial] = useState(false)
    const handleSearchChange = (e)=>{
        setSearch(e.target.value)
    }


    const handleClick =async(e) =>{
       
        setEmptyvalue(false)
        if(!search){
            setinitial(true)
            setEmptyvalue(true)
            return
        }
        await emailSchema.isValid({
                email:search
            })
            .then(function(valid) {
                if(valid)
                    {   setModalShow(true)
                   
                    } 
                else 
                   { 
                    setinitial(true)
                    setEmptyvalue(true)
                    setSearch('')
                }
            });

    }
    const handleYesClick = ()=>{
            props.sendAdminRequest(search)
            setEmptyvalue(false)
            setModalShow(false)
            setSearch('')
            setinitial(true)
    }
    return (
        <div style={{paddingBottom:"9%" , margin:"auto"}}>
         
            < div className="row justify-content-lg-center TAdminnewclass">    

            <TextField placeholder="abcde@example.com" id="outlined-search" label="Search the user"  type="search" variant="outlined" value={search} onChange={(event)=>handleSearchChange(event)} onKeyPress={(e)=>e.charCode===13&&handleClick(e)} style={{width:300,paddingRight:"1%"}}/>

            <Button variant="contained" color="primary" onClick = {handleClick}  disabled={props.data.loading} >Make Admin</Button>
         
            </div>     
            {
                props.data.loading && <CircularProgress  style={{margin:"2% 50%"}} />
            }
            
            {initial&&!props.data.loading &&!emptyvalue&& props.data.data[0]==='A' && <StatusBar message="Succesfully Given Admin Rights" severity="success" /> }
            {initial&&!props.data.loading && !emptyvalue&& props.data.data[0]==='E' && <StatusBar message={props.data.data} severity="error" /> }
            {initial&&emptyvalue && <StatusBar message="Entered email is not in valid email format" severity="warning" />}
            {modalShow && <ConfirmationModal yesclick={handleYesClick} show={modalShow} onHide={() => setModalShow(false)} message="Are you sure you want to give Admin Rights?" header="Give Admin Rights" />}
            
            
           
        </div>
    )
}

const mapStateToProps = (state) => ({
    data:state.adminReducer
    })
const mapDispatchToProps = dispatch =>(
{
    sendAdminRequest : (email)=> dispatch(makeAdmin(email)),

}
)



export default connect(mapStateToProps ,mapDispatchToProps)(TransferAdmin)
