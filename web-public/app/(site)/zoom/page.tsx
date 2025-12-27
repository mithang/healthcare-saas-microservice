'use client';
import React, { useState } from "react";

interface Meeting {
  url: string;
  bannerUrl: string;
  title: string;
}

interface FormValue {
  fullname: string;
  email: string;
}

const meetings: Meeting = {
  url: "https://us05web.zoom.us/j/74164018878?pwd=RFJJVlNSYU40VU9yenVoN3NHdnlkdz09",
  bannerUrl: "",
  title: "Join now",
};

const Home: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    fullname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const mtUrl = new URL(meetings.url);
    const mtNumber = mtUrl.pathname.substr(3),
      mtPassword = mtUrl.searchParams.get("pwd");
    e.preventDefault();
    window.location.href = `/zoom/meeting?id=${mtNumber}&pwd=${mtPassword}&fullname=${formValue.fullname}&email=${formValue.email}`;
  };

  return (
    <div className="meeting">
      <div className="meeting-form">
        <h1 className="meeting-form-title text-primary">
          Đăng ký tham dự webminar
        </h1>
        <span className="meeting-form-sub-title">
          Bạn cần nhập tên và địa chỉ email để tham dự webminar
        </span>
        <form className="meeting-form-wrapper" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="fullname">Họ và tên</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={formValue.fullname}
                  name="fullname"
                  id="fullname"
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={formValue.email}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="nva@abc.mail.com"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary meeting-form-submit">
            Tham gia
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;