import React from 'react';

class SearchCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:"",
            result:null
        }
    }
    render() {
        return (
            <div>
                <h2>详细查询</h2>
                <input type="text" placeholder="请输入查询的省份" onKeyDown={this.searchEvent} value={this.state.value} onChange={this.changeEvent} />
                <div>
                    <div>
                        {this.state.result}
                    </div>
                </div>
            </div>
        )
    }
    searchEvent=(e)=>{
        // console.log(e.keyCode);
        if (e.keyCode===13) {
            // console.log(e.target.value)
            if (this.props.provinceObj[e.target.value]) {
                this.setState({
                    result:
                    (
                        <div>
                            <h2>查询结果</h2>
                            <p>确诊人数：{this.props.provinceObj[e.target.value].confirm}</p>
                            <p>疑似人数：{this.props.provinceObj[e.target.value].suspect}</p>
                            <p>治愈人数：{this.props.provinceObj[e.target.value].heal}</p>
                            <p>死亡人数：{this.props.provinceObj[e.target.value].dead}</p>
                        </div>
                    )
                })
            } else {
                // this.setState({
                //     result: (<p>输入错误，没有找到该省份</p>)
                // })
                alert("输入错误，没有找到该省份");
            }
        }
    }
    changeEvent=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
}

export default SearchCom