
//import ejs from 'ejs'
import dotenv from 'dotenv'
dotenv.config()
import temp from './Templates/custom'
import sendMailConfig from './config'

 const emailService=async(Todos:any)=>{
    const mailoptions={
        from:process.env.EMAIL as string,
        to :`${Todos.assignto}`,
        subject:'Assigned Todo Task',
        text:`${Todos.details}`,
        html:temp(Todos)
    }
  
  try {
    await sendMailConfig(mailoptions)
  } catch (error) {
      console.log(error);
      
  }
  
 }
export default emailService
