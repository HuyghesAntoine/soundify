import { A } from "@patched/hookrouter";
import { Component } from "react";
import { File } from "react-kawaii";

class NonExistentPage extends Component {
    render() {
        return (
            <div className="text-center mt-5 col-md-6 mx-auto">
                <File size={200} mood="ko" color="#e6cb53" />
                <h1 className="pt-2">Oh no, we couldn't find your page !</h1>
                <p>
                    You may safely return to the <A href="/">Home</A> page.
                </p>
            </div>
        );
    }
}
export default NonExistentPage;
