const _ = require('lodash')

const assertArgumentEquals = (aValor1, aValor2, aMessage) =>{
    if(!_.isEqual(aValor1,aValor2))
    {
        return aMessage
    }
}

const assertArgumentFalse = (aboolean, aMessage) => {
    if(aboolean){
        return aMessage
    }
}

const assertArgumentLengthMax = (aString, aMaximum, aMessage) =>{
    const alength = aString.trim().length
    if(alength>aMaximum)
    {
        return aMessage
    }
}

const assertArgumentLengthMin = (aString,aMinimun,aMessage) => {
    const alength = aString.trim().length
    if(alength < aMinimun)
    {
        return aMessage
    }
}

const assertArgumentLength = (aString, aMinimun, aMaximun, aMessage)=>{
    const aLength = aString.trim().length

    if(aLength > aMaximun || aLength < aMinimun)
    {
        return aMessage
    }

}

const assertArgumentNotEmpty = (aString, aMessage)=>{
    aString = _.toString(aString)
    if(aString == null || aString.trim().length == 0)
    {
        return aMessage
    }
}

const assertArgumentRange = (aNumber,aMimun,aMaximun,aMessage) => {
    if(aNumber < aMimun || aNumber > aMaximun)
    {
        return aMessage
    }
}

const assertArgumentRangeNotMax = (aNumber, aMinimun, aMaximun, aMessage)=>{
    if(!_.inRange(aNumber,aMinimun,aMaximun))
    {
        return aMessage
    }
}

const assertArgumentNotNull = (aObject,aMessage) =>{
    var aString = _.toString(aObject)
    if(aObject == null || _.isEmpty(aString))
    {
        return aMessage
    }
}

const assertArgumentTrue = (aboolean, aMessage) => {
    if(!aboolean){
        return aMessage
    }
}

const assertArgumentNullOrEmpty = (aObject,aMessage) => {
    
    return assertArgumentNotNull(aObject,aMessage) || assertArgumentNotEmpty(aObject,aMessage)
}

const assertArgumentNotHasProperty=(aObject,aProperty,aMessage) =>{
   if(!aObject.hasOwnProperty(aProperty))
   {
       return aMessage
   }
}

module.exports = { 
    assertArgumentEquals, 
    assertArgumentFalse, 
    assertArgumentLengthMax, 
    assertArgumentLengthMin, 
    assertArgumentLength,
    assertArgumentNotEmpty,
    assertArgumentRange,
    assertArgumentRangeNotMax,
    assertArgumentNotNull,
    assertArgumentTrue,
    assertArgumentNullOrEmpty,
    assertArgumentNotHasProperty
 }