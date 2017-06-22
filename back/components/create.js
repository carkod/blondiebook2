
export function Create (req, res, db) {
    /* If param is required -> notEmpty
    * If param alpha + spaces -> .matches(/^[a-z0-9 ]+$/i)
    *   If param requires more than 1 validation, so more than 1 warnings -> withMessage
    *   If param is optional, remove checBody second argument -> checkBody('city')
    *   If param is optional but needs to check second validation -> optional({ checkFalsy: true })
    */
    req.checkBody('name', 'Invalid name field').notEmpty().withMessage('Name required');
    req.checkBody('city').optional({ checkFalsy: true });
    req.checkBody('country').optional({ checkFalsy: true });
    req.checkBody('cover', 'Invalid URL field').notEmpty().withMessage('URL is required').isURL().withMessage('URL format is wrong');
    
    
    
    req.getValidationResult().then(function(result){
        if (!result.isEmpty()) {
            //If 2 errors, it will show first one, then another once it is solved
            let errors = result.useFirstErrorOnly().array();
            console.log(errors);
            res.status(400).json(errors);
            
            
        } else {
            
            const { name, city, country, cover, createdAt, modifiedAt } = req.body;
            db.collection('girls').insert({ name, city, country, cover, createdAt, modifiedAt }, (err, result) => {
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