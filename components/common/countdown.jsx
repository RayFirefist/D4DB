import React from 'react';
import l10n from '../../utils/l10n/l10n';

const strings = new l10n();

const calculateTimeLeft = (end) => {
    let difference = +new Date(end*1000) - +Date.now();

    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
}

class Countdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            countdown: calculateTimeLeft(props.end),
            end: props.end,
        }
        let timeout = setInterval(() => {
            this.setState({countdown: calculateTimeLeft(props.end)})
        }, 1000);
        this.setState({timeout: timeout});
    }

    render() {
        let time = this.state.countdown;
        let str = strings.getString("COMMON_COUNTDOWN").format(time.days, time.hours, time.minutes, time.seconds);

        if (this.state.end < parseInt(Date.now()/1000)) {
            str = strings.getString("COMMON_COUNTDOWN_END");
            clearInterval(this.state.timeout);
        }

        return <>
            {str}
        </>
    }
}

export default Countdown;