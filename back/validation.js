export function Validation (req, res) {
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
}