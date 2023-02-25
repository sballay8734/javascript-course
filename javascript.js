fetch("/owner-stats.json")
  .then((response) => response.json())
  .then((data) => {
    const ownerData = data.map((item) => {
      return {
        ownerInfo: item.ownerInfo,
        2014: item[2014] // You can already access regularSeason and playoffs from here

        // ownerName: item.ownerInfo.ownerName,
        // seasons: item.ownerInfo.seasons,
        // wins: item.ownerInfo.wins,
        // losses: item.ownerInfo.losses,
        // ties: item.ownerInfo.losses,

        // get pointsFor2014() {
        //   totalPoints = 0
        //   let keys = Object.keys(item[2014].regularSeason)
        //   keys.forEach((key) => {
        //     totalPoints += this[2014].regularSeason[key].pointsFor
        //   })
        //   return totalPoints
        // },
        // get winPct() {
        //   return parseFloat(
        //     ((this.wins / (this.losses + this.wins + this.ties)) * 100).toFixed(
        //       1
        //     )
        //   )
        // }
      }
    })
    console.log(ownerData)
  })

// FUNCTIONS *******************************************************************

// function calcYearlyTotalPointsFor(owner, year) {
//   currentOwner = ownerList.find((item) => item.ownerInfo.ownerName === owner)
//   let totalPointsFor = 0

//   let keys = Object.keys(currentOwner[year].regularSeason)
//   keys.forEach((key, index) => {
//     totalPointsFor += currentOwner[year].regularSeason[key].pointsFor
//   })

//   return totalPointsFor.toFixed(2)
// }
// console.log(calcYearlyTotalPointsFor("Shawn Ballay", 2014))

// FUNCTIONS *******************************************************************
