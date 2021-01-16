import React, { Component } from 'react';

import { CircularProgress, Button, Divider } from '@material-ui/core';

import DownloadIcon from '@material-ui/icons/GetApp';

import l10n from '../../utils/l10n/l10n';

const strings = new l10n();

const DEFAULT_404_ROUTE = "/assets/common/404.png";

class SafeImageLoader extends Component {
    constructor(props) {
        super(props)
        this.src = props.src
        this.oldSrc = ""
        this.style = props.style ?? {}
        this.downloadUrl = ""
        this.downloadable = props.downloadable ? true : false
        this.alternativeUrl = props.alternativeUrl ?? DEFAULT_404_ROUTE;
        this.state = {
            loading: true,
            error: false,
            errorReason: "ERROR_DUMMY",
            loadingStatus: 0,
            imgData: null
        }
        this.className = props.className
        this.downloadEnabled = true
        console.log(props.src)
    }

    downloadAndLoadImage() {
        this.downloadEnabled = false
        let xhr = new XMLHttpRequest();
        let self = this
        xhr.responseType = 'blob'; //so you can access the response like a normal URL
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let localUrl = URL.createObjectURL(xhr.response);
                    self.setState({ loading: false, imgData: localUrl })
                    self.oldSrc = self.src
                    self.downloadUrl = localUrl
                    self.downloadEnabled = true
                }
                else {
                    // Different file extension scenario
                    let newUrl = self.src;
                    let temp = newUrl.split(".")
                    switch (temp[temp.length - 1]) {
                        case 'jpg':
                            temp[temp.length - 1] = "png"
                            break;
                        case 'png':
                            temp[temp.length - 1] = "jpg"
                            break;
                        default: return;
                    }
                    let xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.open('GET', temp.join("."), true);
                    xhr.send();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                let localUrl = URL.createObjectURL(xhr.response);
                                self.setState({ loading: false, imgData: localUrl })
                                self.oldSrc = self.src
                                self.downloadUrl = localUrl
                                self.downloadEnabled = true
                            }
                            else {
                                // Alternative URL scenario
                                let newUrl = self.alternativeUrl;
                                let xhr = new XMLHttpRequest();
                                //self.className = null;

                                if (newUrl == DEFAULT_404_ROUTE) {
                                    //self.style['width'] = "100%";
                                    self.style['maxWidth'] = "60px";
                                }

                                xhr.responseType = 'blob';
                                xhr.open('GET', newUrl, true);
                                xhr.send();
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === XMLHttpRequest.DONE) {
                                        if (xhr.status === 200) {
                                            let localUrl = URL.createObjectURL(xhr.response);
                                            self.setState({ loading: false, imgData: localUrl })
                                            self.oldSrc = self.src
                                            self.downloadUrl = localUrl
                                            self.downloadEnabled = true
                                        }
                                        else {
                                            // Not found scenario
                                            let newUrl = DEFAULT_404_ROUTE;
                                            let xhr = new XMLHttpRequest();
                                            //self.className = null;
                                            if (newUrl == DEFAULT_404_ROUTE) {
                                                //self.style['width'] = "100%";
                                                self.style['maxWidth'] = "60px";
                                            }
                                            xhr.responseType = 'blob';
                                            xhr.open('GET', newUrl, true);
                                            xhr.send();
                                            xhr.onreadystatechange = function () {
                                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                                    if (xhr.status === 200) {
                                                        let localUrl = URL.createObjectURL(xhr.response);
                                                        self.setState({ loading: false, imgData: localUrl })
                                                        self.oldSrc = self.src
                                                        self.downloadUrl = localUrl
                                                        self.downloadEnabled = true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
        xhr.open('GET', this.src, true);
        xhr.send();
    }

    componentDidMount() {
        this.downloadAndLoadImage();
    }

    componentDidUpdate() {
        console.log("Trigger update");
        this.src = this.props.src
        if (this.downloadEnabled && !(this.src === this.oldSrc)) {
            this.setState({ loading: true })
            this.downloadAndLoadImage();
        }
    }

    openAssetInNewPage() {
        window.open(this.downloadUrl, '_blank');
    }

    render() {
        if (this.state.error)
            return <img src="" alt="illust" />
        if (this.state.loading)
            return <CircularProgress style={{ position: "absolute" }} />
        if (this.downloadable)
            return <div align="center">
                <Button onClick={this.openAssetInNewPage.bind(this)} variant="contained" endIcon={<DownloadIcon></DownloadIcon>}>{strings.getString("STILL_ENTRY_DOWNLOAD_ARTWORK")}</Button>
                <Divider></Divider>
                <br></br>
                <img src={this.state.imgData} alt={"illustration"} style={this.style} className={this.className} />
            </div>
        return <img src={this.state.imgData} alt={"illustration"} style={this.style} className={this.className} />
    }
}

export default SafeImageLoader;