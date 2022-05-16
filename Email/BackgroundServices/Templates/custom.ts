
interface TodoInterface{ 
    id?:number,
    title?:string,
    date?:string,
    details?:string,
    complete?:boolean,
    assignto?:string
}

const temp=(Todos:TodoInterface)=>{
    return`
      <tr>
          <td style="padding: 20px;">
            <table width="600" style="margin: auto;">
                <tr>
                    <td>
                        <img src="https://cdn.pixabay.com/photo/2020/08/10/14/17/hummingbird-5477966__340.jpg" alt="bird"/>
                        <h6 style="font-size:10px;">Assigned to ${Todos.assignto} Make sure this is,</h6>
                        <h6 style="font-size: 10px;">if not just ignore this email</h6>
                        <br>
                        <hr>
                        <h6>Your Task Is </h1>
                        <p> ${Todos.title}</p>
                        <h6>More Details</h6>
                        <p> ${Todos.details} </p>
                        <h6>The dask should be done by end of</h6>
                        <p> ${Todos.date} </p>

                    </td>
                </tr>
            </table>
        </td>
      </tr>
      <tr>
          <td>
              <table width="600" style="margin: auto;">
                
            </table>
          </td>
      </tr>
    </table>
    `
}
export default temp;