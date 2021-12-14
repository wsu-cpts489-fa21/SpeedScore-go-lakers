/* RoundsMode: The enumerated type for Rounds modes. */

const RoundsMode = {
    ROUNDSTABLE: "RoundsTable",
    LOGROUND: "LogRound",
    LOGLIVEROUND: "logLiveRound",
    EDITROUND: "EditRound",
    LIVEROUNDDETAILS: "LiveRoundDetails"
};

Object.freeze(RoundsMode); //This ensures that the object is immutable.

export default RoundsMode;
