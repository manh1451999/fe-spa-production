import React from 'react';

const LayoutTableAdmin = (props) => {
    return (
        <div class="content-wrapper">


            {/* <!-- Main content --> */}
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">


                            {props.children}

                        </div>
                        {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>
            {/* <!-- /.content --> */}
        </div>
    );
};

export default LayoutTableAdmin;