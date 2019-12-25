// Notes to implement:

// Function that creates Object for allowed dash and bracket locations based on example numbers.
// Distinguishing between land codes

console.log(" ")
console.log("Hello, World")
console.log(" ")

function TelephoneCheck(phoneNumber) {

  let err = ""
  let plusFound = false;

  function phoneNumbersCreate(phoneNumber) {
    console.log("")
    console.log("starting RemoveNaN")
    let phoneNumbers = {
      bareNumber: [],
      noDashesNumber: [],
      noBracketsNumber: []
    }

    let bracketFound = false;

    console.log(phoneNumber)
    // let dashFound = false;
    for (let i = 0; i < phoneNumber.length; i++) {
      // console.log("")
      // console.log(`starting loop ${i}`)
      // console.log(phoneNumber.charAt(i))
      // console.log(isNaN(phoneNumber.charAt(i)))
      if (phoneNumber.charAt(0) === "+" && plusFound === false) {
        plusFound = true;
        // console.log(`${phoneNumber.charAt(0)} is a +`)
      }
      else if (phoneNumber.charAt(i) == " ") {
        // console.log(`${phoneNumber.charAt(i)} is a space`)
        //do nothing LEL
      }
      else if (isNaN(phoneNumber.charAt(i)) === false) {
        phoneNumbers.bareNumber.push(phoneNumber.charAt(i))
        phoneNumbers.noDashesNumber.push(phoneNumber.charAt(i))
        phoneNumbers.noBracketsNumber.push(phoneNumber.charAt(i))
        // console.log(`${phoneNumber.charAt(i)} is a number`)
      }
      else if (phoneNumber.charAt(i) === "(") {
        if (bracketFound === true) {
          err = "second opening bracket before first closed"
          console.log(err)
          return err
        }
        bracketFound = true;
        phoneNumbers.noBracketsNumber.push(phoneNumber.charAt(i))
        // console.log(`${phoneNumber.charAt(i)} is a open bracket`)
      }
      else if (phoneNumber.charAt(i) === ")") {
        if (bracketFound === false) {
          err = "opening bracket missing"
          // console.log(err)
          return err
        }
        bracketFound = false;
        phoneNumbers.noBracketsNumber.push(phoneNumber.charAt(i))
        // console.log(`${phoneNumber.charAt(i)} is a closing bracket`)
      }
      else if (phoneNumber.charAt(i) === "-") {
        phoneNumbers.noDashesNumber.push(phoneNumber.charAt(i))
        // console.log(`${phoneNumber.charAt(i)} is a closing dash`)
      }
      else {
        err = "Phonenumber doesnt adhere the rules"
        // console.log(err)
        return err
      }
      // console.log(`finished loop ${i}`)
    }

    console.log(`finished, result: ${phoneNumbers} `)

    return phoneNumbers
  }

  const validPositions = {
    Dashes: {
      OnePresent: {
        Three: [[1, 5, 9]],
        Two: [[1, 5], [1, 8], [4, 8]],
        One: [[1], [4], [7]]
      },

      OneAbsent: {
        Two: [[3, 7]],
        One: [[3], [6]]
      }

    },

    /*
    1-544-499-9999
    1-544-4999999
    1-544499-9999
    1-5444999999
    1544-499-9999
    1544-4999999
    01234567890123
 
    0123456789012
    544-499-9999
    544-4999999
    544499-9999
    */

    Roundbrackets: {
      OnePresent: {
        Four: [[0, 3, 8, 13]],
        Three: [[0, 3, 8], [0, 3, 11], [0, 6, 11], [1, 6, 11]],
        Two: [[0, 3], [0, 6], [0, 9], [1, 6], [1, 9], [4, 9]],
        One: [[0], [1], [4], [7]]
      },

      OneAbsent: {
        Three: [[0, 5, 10]],
        Two: [[0, 5], [0, 8], [3, 8]],
        One: [[0], [3], [6]]
      }
    }

    /*
    (1)(544)(499)(9999)
    (1)(544)(499)9999
    (1)(544)499(9999)
    (1)544(499)(9999)
    1(544)(499)(9999)
    (1)(544)4999999
    (1)544(499)9999
    (1)544499(9999)
    1(544)(499)9999
    1(544)499(9999)
    1544(499)(9999)
    (1)5444999999
    1(544)4999999
    1544(499)9999
    1544499(9999)

    (544)(499)(9999)
    1234567890123456
    (544)(499)9999
    (544)499(9999)
    1234567890123456
    544(499)(9999)
    (544)4999999
    1234567890123456
    544(499)9999
    544499(9999)
    1234567890123456
    */
  }


  function DashesChecker(phoneNumbers, validPositions) {
    console.log("")
    console.log(`starting DashesChecker`)
    console.log(validPositions)
    console.log(phoneNumbers)

    let dashCount = 0;
    console.log(phoneNumbers.bareNumber.length + " and?")
    console.log(phoneNumbers.noDashesNumber)

    if (phoneNumbers.noDashesNumber.length - phoneNumbers.bareNumber.length == 2) {
      // select option with 2 dashes
      validPositions.Dashes.OneAbsent.Two.forEach(array => {
        console.log(`current array ${array}`)
        array.forEach(i => {
          console.log(i)
          console.log(` the character being checked ${phoneNumbers.noDashesNumber[i]}`)
          if (phoneNumbers.noDashesNumber[i] === "-") {
            dashCount += 1;
            console.log(`added a dash ${dashCount}`)

          }
          console.log(`returning ${dashCount}`)
          return dashCount


        })

        console.group(` counted dashes ${dashCount}`)

        if (dashCount === 2) {

          console.log(`returning true`)
          return true
        }
        else {
          dashCount = 0
          console.log(`reset dashcount to 0 ${dashCount}`)
        }
        console.log(`finished ${array}`)
      })
      return false
    }

    else if (phoneNumbers.noDashesNumber.length - phoneNumbers.bareNumber.length === 1) {
      // select option with 1 dash
      console.log(`1 dashes found `)
      validPositions.Dashes.OneAbsent.One.forEach(array => {
        console.log(`currently at array ${array}`)
        array.forEach(i => {
          console.log(`currently checking ${i}`)
          console.log(`character at ${i} is ${phoneNumbers.noDashesNumber[i]}`)
          if (phoneNumbers.noDashesNumber[i] === "-") {
            dashCount += 1;
            console.log(`added to the count ${dashCount}`)
          }

        })
        if (dashCount === 1) {
          console.log(`returning true`)
          return true
        }
        else {
          dashCount = 0
          console.log(`reset dashcount ${dashCount}`)
        }
      })
      return false
    }

    else if (phoneNumbers.noDashesNumber.length - phoneNumbers.bareNumber.length === 0) {
      // select option with 0 dash
      console.log(`0 dashes found`)
      console.log(`returning true`)
      return true
    }

    console.log(`did nothing in dashesChecker`)

  }

  const phoneNumbers = phoneNumbersCreate(phoneNumber)

  function PhonenumberValidator(phoneNumbers, validPositions) {
    // first check length phonNumbers.bareNumer

    // depending on length phoneNumbers.noDashesNumber enter different object, checks location of dashes as described in validPositions.Dashes.number[x, y, z] 

    // depending on length phoneNumbers.noBracketsNumber enter different object, checks location of opening brackets as described in validPositions.Dashes.number[x, y, z] 
    if (phoneNumbers.bareNumber === 10) {
      // doesnt start with the 1

    }
    console.log(validPositions)
    console.log(phoneNumbers)
    console.log(DashesChecker(phoneNumbers, validPositions))
    return phoneNumbers
  }

  PhonenumberValidator(phoneNumbers, validPositions)

}

TelephoneCheck("(544)(499)(9-081)")

