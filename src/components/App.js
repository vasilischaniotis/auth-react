import React from "react";
import {Container} from "react-bootstrap";
import Signup from "./Signup";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ForgotPassword from "./ForgotPassword";
import ProfileUpdate from "./ProfileUpdate";
import NavigationBar from "./NavigationBar";


function App() {
    return (
        <>
            <div className="w-100">
                <BrowserRouter>
                    <AuthProvider>
                        <NavigationBar/>
                        <Container
                            className="d-flex justify-content-center"
                            style={{minHeight: "100vh"}}
                        >
                            <Routes>
                                {/* Private routes for logged-in users */}
                                <Route exact path="/" element={
                                    <PrivateRoute>
                                        <Home/>
                                    </PrivateRoute>
                                }/>
                                <Route path="/update-profile" element={
                                    <PrivateRoute>
                                        <ProfileUpdate/>
                                    </PrivateRoute>
                                }/>

                                {/* Public routes for NOT currently logged-in users */}
                                <Route path="/signup" element={
                                    <PublicRoute>
                                        <Signup/>
                                    </PublicRoute>
                                }/>
                                <Route path="/login" element={
                                    <PublicRoute>
                                        <Login/>
                                    </PublicRoute>
                                }/>
                                <Route path="/forgot-password" element={
                                    <PublicRoute>
                                        <ForgotPassword/>
                                    </PublicRoute>
                                }/>
                            </Routes>
                        </Container>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
