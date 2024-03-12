import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { BiSolidCity } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

export default function Profile() {
    return (
        <div className="outer-container">
            <div className="green-square2">
                <div className="profile-picture-container">
                    <img src="perfil.png" alt="" className="" />
                </div>
            </div>
            <div className="pt-14 text-yellow">
                <h2 className="profilename">Rafael Alegre</h2>
                <h2 className="profilename2">Metalhead</h2>
            </div>
            <div className="container">
                <div className="profile-content mt-8">
                    <div>
                        <div className="linhas">
                            <div className="linhas-content">
                                <p><CgProfile />rafa</p>
                            </div>
                        </div>
                        <div className="linhas">
                            <div className="linhas-content">
                                <p><MdEmail />rafaelalegre@example.com </p>
                            </div>
                        </div>
                        <div className="linhas">
                            <div className="linhas-content">
                                <p><BiSolidCity />Sintra, Portugal</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="image-container2">
                <img src="Frame1.png" alt="Description of the image" />
            </div>
        </div>
    );
}