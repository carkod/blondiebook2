
export function Create (req, res, db) {
    /* If param is required -> notEmpty
    * If param alpha + spaces -> .matches(/^[a-z0-9 ]+$/i)
    *   If param requires more than 1 validation, so more than 1 warnings -> withMessage
    *   If param is optional, remove checBody second argument -> checkBody('city')
    *   If param is optional but needs to check second validation -> optional({ checkFalsy: true })
    */
    req.checkBody('name', 'Invalid name field').notEmpty().withMessage('Name required').matches(/^[a-z0-9 ]+$/i).withMessage('Name has to be alphabetic');
    req.checkBody('city').optional({ checkFalsy: true }).matches(/^[a-z0-9 ]+$/i).withMessage('City must be alphabetic');
    req.checkBody('country').optional({ checkFalsy: true }).matches(/^[a-z0-9 ]+$/i).withMessage('Country must be alphabetic');
    req.checkBody('cover', 'Invalid URL field').notEmpty().withMessage('URL is required').isURL().withMessage('URL format is wrong');
    
    
    
    req.getValidationResult().then(function(result){
        if (!result.isEmpty()) {
            //If 2 errors, it will show first one, then another once it is solved
            let errors = result.useFirstErrorOnly().array();
            console.log(errors);
            res.status(400).json(errors);
            
            
        } else {
            
            const { name, city, country, cover} = req.body;
            db.collection('girls').insert({ name, city, country, cover }, (err, result) => {
                console.log('inserted to db')
                if (err) {
                  res.status(500).json({ errors: { global: "Something went wrong" }});
                } else {
                  res.json({ girl: result.ops[0] });
                }
              });
        }   
    });
        
}