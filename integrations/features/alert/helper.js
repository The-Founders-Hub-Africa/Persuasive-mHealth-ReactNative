export const get_message_and_code = (data) => {
    console.log(data)
    let result = {
        status_code: data.status,
        message: ['An error occured']
    }   
    
    if (result.status_code == 'FETCH_ERROR') { 
        result.message = ['Network Error']
        result.status_code = 500
        return result  
    }

    if (result.status_code == "PARSING_ERROR") {
        result.message = ['Parsing Error']
        result.status_code = 500
        return result
    }

    if (data.status == 200) {
        result.message = [data.message]
        result.status_code = 200
        return result  
    }

    if (data.status != 200) {
        let mgs = []
        for (const [key, value] of Object.entries(data.data)) {
            if (key == 'detail' || key == 'message') {
                mgs.push(value)
            } else {
                mgs.push(value[0])
            }   
            
        }

        if (mgs.length > 0) {
            result.message = mgs
        } else {
            result.message = ['error occured']
        }
    }

    // if (data.page == 'login' && data.status != 200) {
    //     if (data.data.non_field_errors) {
    //         result.message = data.data.non_field_errors[0]
    //      }
    // }

    // if (data.page == 'signup' && data.status != 200) {
    //     if (data.data.non_field_errors) {
    //         result.message = data.data.non_field_errors[0]
    //     }
    //     let mgs = []
    //     for (const [key, value] of Object.entries(data.data)) {
    //             mgs.push(value[0])
    //     }
        
    //     if (mgs.length > 0) {
    //         result.message = mgs
    //     }else{
    //         result.message = ['error occured']
    //     }
    // }

    return result
}

